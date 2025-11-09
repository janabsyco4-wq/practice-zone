import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';

const router = Router();

router.get('/', authenticate, getCart);
router.post('/items', authenticate, addToCart);
router.put('/items/:itemId', authenticate, updateCartItem);
router.delete('/items/:itemId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

export default router;
