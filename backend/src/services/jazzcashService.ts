import crypto from 'crypto';
import axios from 'axios';

// JazzCash Production Configuration
const JAZZCASH_CONFIG = {
  MERCHANT_ID: process.env.JAZZCASH_MERCHANT_ID || '',
  PASSWORD: process.env.JAZZCASH_PASSWORD || '',
  INTEGRITY_SALT: process.env.JAZZCASH_INTEGRITY_SALT || '',
  RETURN_URL: process.env.JAZZCASH_RETURN_URL || `${process.env.FRONTEND_URL}/payment/jazzcash/callback`,
  // Use production URL if NODE_ENV is production, otherwise sandbox
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'
    : 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/',
  INQUIRY_URL: process.env.NODE_ENV === 'production'
    ? 'https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
    : 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction',
};

// Generate secure hash for JazzCash (SHA256 HMAC)
export const generateHash = (data: any): string => {
  // Remove pp_SecureHash if present
  const dataToHash = { ...data };
  delete dataToHash.pp_SecureHash;
  
  // Sort keys and create string
  const sortedString = Object.keys(dataToHash)
    .sort()
    .map(key => dataToHash[key])
    .join('&');
  
  // Create hash string with integrity salt
  const hashString = `${JAZZCASH_CONFIG.INTEGRITY_SALT}&${sortedString}`;
  
  // Generate HMAC SHA256 hash
  return crypto.createHmac('sha256', JAZZCASH_CONFIG.INTEGRITY_SALT)
    .update(hashString)
    .digest('hex')
    .toUpperCase();
};

// Create JazzCash payment request
export const createPaymentRequest = (orderData: {
  orderId: string;
  amount: number;
  customerEmail: string;
  customerMobile: string;
  description: string;
}) => {
  const txnDateTime = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
  const txnExpiryDateTime = new Date(Date.now() + 3600000).toISOString().replace(/[-:T]/g, '').split('.')[0];
  const txnRefNumber = `T${Date.now()}`;

  const paymentData = {
    pp_Version: '1.1',
    pp_TxnType: 'MWALLET',
    pp_Language: 'EN',
    pp_MerchantID: JAZZCASH_CONFIG.MERCHANT_ID,
    pp_SubMerchantID: '',
    pp_Password: JAZZCASH_CONFIG.PASSWORD,
    pp_BankID: 'TBANK',
    pp_ProductID: 'RETL',
    pp_TxnRefNo: txnRefNumber,
    pp_Amount: Math.round(orderData.amount * 100).toString(), // Convert to paisa
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: txnDateTime,
    pp_BillReference: orderData.orderId,
    pp_Description: orderData.description,
    pp_TxnExpiryDateTime: txnExpiryDateTime,
    pp_ReturnURL: JAZZCASH_CONFIG.RETURN_URL,
    pp_SecureHash: '',
    ppmpf_1: orderData.customerEmail,
    ppmpf_2: orderData.customerMobile,
    ppmpf_3: '',
    ppmpf_4: '',
    ppmpf_5: '',
  };

  // Generate secure hash
  paymentData.pp_SecureHash = generateHash(paymentData);

  return {
    url: JAZZCASH_CONFIG.API_URL,
    data: paymentData,
  };
};

// Verify JazzCash payment response
export const verifyPaymentResponse = (responseData: any): boolean => {
  const receivedHash = responseData.pp_SecureHash;
  delete responseData.pp_SecureHash;

  const calculatedHash = generateHash(responseData);
  
  return receivedHash === calculatedHash && responseData.pp_ResponseCode === '000';
};

// Check transaction status
export const checkTransactionStatus = async (txnRefNo: string) => {
  try {
    const inquiryData = {
      pp_Version: '1.1',
      pp_TxnType: 'INQUIRY',
      pp_Language: 'EN',
      pp_MerchantID: JAZZCASH_CONFIG.MERCHANT_ID,
      pp_Password: JAZZCASH_CONFIG.PASSWORD,
      pp_TxnRefNo: txnRefNo,
      pp_SecureHash: '',
    };

    inquiryData.pp_SecureHash = generateHash(inquiryData);

    const response = await axios.post(JAZZCASH_CONFIG.INQUIRY_URL, inquiryData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('JazzCash inquiry error:', error);
    throw error;
  }
};

// Refund transaction
export const refundTransaction = async (txnRefNo: string, amount: number) => {
  try {
    const refundData = {
      pp_Version: '1.1',
      pp_TxnType: 'REFUND',
      pp_Language: 'EN',
      pp_MerchantID: JAZZCASH_CONFIG.MERCHANT_ID,
      pp_Password: JAZZCASH_CONFIG.PASSWORD,
      pp_TxnRefNo: txnRefNo,
      pp_Amount: Math.round(amount * 100).toString(),
      pp_TxnCurrency: 'PKR',
      pp_SecureHash: '',
    };

    refundData.pp_SecureHash = generateHash(refundData);

    const response = await axios.post(JAZZCASH_CONFIG.INQUIRY_URL, refundData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('JazzCash refund error:', error);
    throw error;
  }
};
