import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  initiatePayment,
  handlePaymentCallback,
  getPaymentStatus,
  verifyTransaction,
  refundPayment,
} from '../controllers/jazzcashController';

const router = Router();

// Initiate JazzCash payment
router.post('/initiate', authenticate, initiatePayment);

// Payment callback (webhook from JazzCash)
router.post('/callback', handlePaymentCallback);

// Get payment status
router.get('/status/:orderId', authenticate, getPaymentStatus);

// Verify transaction from JazzCash
router.get('/verify/:txnRefNo', authenticate, verifyTransaction);

// Refund payment (admin only)
router.post('/refund/:orderId', authenticate, refundPayment);

export default router;
