import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getUserOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.get('/:id', authenticate, getOrderById);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);

export default router;
