import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth';
import { getAdminStats } from '../controllers/statsController';

const router = Router();

router.get('/', authenticate, isAdmin, getAdminStats);

export default router;
