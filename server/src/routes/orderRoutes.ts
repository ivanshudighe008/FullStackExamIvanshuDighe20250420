import express from 'express';
import { checkout, userOrders } from '../controllers/orderController';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.post('/checkout', authMiddleware, checkout);
router.get('/my-orders', authMiddleware, userOrders);

export default router;