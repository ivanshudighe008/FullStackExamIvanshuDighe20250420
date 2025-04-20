import express from 'express';
import { getDashboard } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.get('/', authMiddleware, getDashboard);

export default router;
