import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import { createPaymentRequest, verifyPaymentResponse, checkTransactionStatus, refundTransaction } from '../services/jazzcashService';

// Initiate JazzCash payment
export const initiatePayment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.user!.id as any);
    const { orderId, customerMobile } = req.body;

    // Validate mobile number format (Pakistani format)
    if (!customerMobile || !/^03\d{9}$/.test(customerMobile)) {
      return res.status(400).json({ 
        error: 'Invalid mobile number. Please provide a valid Pakistani mobile number (03XXXXXXXXX)' 
      });
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if order is already paid
    if (order.status === 'PROCESSING' || order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      return res.status(400).json({ error: 'Order is already paid' });
    }

    // Create JazzCash payment request
    const paymentRequest = createPaymentRequest({
      orderId: order.id.toString(),
      amount: order.total,
      customerEmail: order.user.email,
      customerMobile: customerMobile,
      description: `Order #${order.id} - ${order.items.length} items`,
    });

    // Log payment initiation
    console.log(`[JazzCash] Payment initiated for Order #${order.id}, Amount: PKR ${order.total}`);

    res.json({
      success: true,
      paymentUrl: paymentRequest.url,
      paymentData: paymentRequest.data,
      orderId: order.id,
      amount: order.total,
    });
  } catch (error) {
    console.error('[JazzCash] Initiate payment error:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

// Handle JazzCash payment callback
export const handlePaymentCallback = async (req: AuthRequest, res: Response) => {
  try {
    const responseData = req.body;

    console.log('[JazzCash] Payment callback received:', {
      orderId: responseData.pp_BillReference,
      responseCode: responseData.pp_ResponseCode,
      txnRefNo: responseData.pp_TxnRefNo,
    });

    // Verify payment response
    const isValid = verifyPaymentResponse(responseData);

    if (!isValid) {
      console.error('[JazzCash] Invalid payment response - hash mismatch');
      return res.status(400).json({ error: 'Invalid payment response' });
    }

    const orderId = parseInt(responseData.pp_BillReference);
    const isSuccess = responseData.pp_ResponseCode === '000';
    const responseMessage = responseData.pp_ResponseMessage || 'Unknown response';

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      console.error(`[JazzCash] Order #${orderId} not found`);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: isSuccess ? 'PROCESSING' : 'CANCELLED',
        stripePaymentId: responseData.pp_TxnRefNo, // Store JazzCash transaction ref
      },
    });

    console.log(`[JazzCash] Order #${orderId} updated - Status: ${isSuccess ? 'PROCESSING' : 'CANCELLED'}`);

    res.json({
      success: isSuccess,
      message: isSuccess ? 'Payment successful' : `Payment failed: ${responseMessage}`,
      orderId,
      transactionId: responseData.pp_TxnRefNo,
      responseCode: responseData.pp_ResponseCode,
    });
  } catch (error) {
    console.error('[JazzCash] Callback error:', error);
    res.status(500).json({ error: 'Failed to process payment callback' });
  }
};

// Get payment status
export const getPaymentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const userId = parseInt(req.user!.id as any);

    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      orderId: order.id,
      status: order.status,
      transactionId: order.stripePaymentId,
      amount: order.total,
    });
  } catch (error) {
    console.error('[JazzCash] Get payment status error:', error);
    res.status(500).json({ error: 'Failed to get payment status' });
  }
};

// Verify transaction status from JazzCash
export const verifyTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { txnRefNo } = req.params;
    const userId = parseInt(req.user!.id as any);

    // Find order with this transaction reference
    const order = await prisma.order.findFirst({
      where: { stripePaymentId: txnRefNo },
    });

    if (!order) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check transaction status from JazzCash
    const txnStatus = await checkTransactionStatus(txnRefNo);

    res.json({
      orderId: order.id,
      transactionId: txnRefNo,
      status: txnStatus,
      orderStatus: order.status,
    });
  } catch (error) {
    console.error('[JazzCash] Verify transaction error:', error);
    res.status(500).json({ error: 'Failed to verify transaction' });
  }
};

// Refund payment
export const refundPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const userId = parseInt(req.user!.id as any);

    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only admin can refund (you can add admin check here)
    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!order.stripePaymentId) {
      return res.status(400).json({ error: 'No payment transaction found' });
    }

    // Process refund
    const refundResult = await refundTransaction(order.stripePaymentId, order.total);

    if (refundResult.pp_ResponseCode === '000') {
      // Update order status
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELLED' },
      });

      console.log(`[JazzCash] Refund successful for Order #${order.id}`);

      res.json({
        success: true,
        message: 'Refund processed successfully',
        orderId: order.id,
        refundAmount: order.total,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Refund failed',
        error: refundResult.pp_ResponseMessage,
      });
    }
  } catch (error) {
    console.error('[JazzCash] Refund error:', error);
    res.status(500).json({ error: 'Failed to process refund' });
  }
};
