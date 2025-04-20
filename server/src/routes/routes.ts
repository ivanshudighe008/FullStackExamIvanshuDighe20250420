import { Router } from 'express';

import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import reportRoutes from './reportRoutes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/reports', reportRoutes);

export default router;
