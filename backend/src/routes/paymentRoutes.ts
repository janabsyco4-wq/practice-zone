import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
} from '../controllers/paymentController';

const router = Router();

router.post('/create-payment-intent', authenticate, createPaymentIntent);
router.post('/confirm', authenticate, confirmPayment);
router.get('/status/:paymentIntentId', authenticate, getPaymentStatus);

export default router;
