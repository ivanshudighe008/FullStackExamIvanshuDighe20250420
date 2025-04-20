import express from 'express';
import { getCart, updateCart } from '../controllers/cartController';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.get('/', authMiddleware, getCart);
router.put('/', authMiddleware, updateCart);

export default router;
