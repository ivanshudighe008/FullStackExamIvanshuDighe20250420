import express from 'express';
import {
  categorySales,
  dailyRevenue,
  topSpenders,
  summary,
} from '../controllers/reportController';
import { authMiddleware } from '../middleware/auth';
const router = express.Router();

router.get('/daily-revenue', authMiddleware, dailyRevenue);
router.get('/top-spenders', authMiddleware, topSpenders);
router.get('/category-sales', authMiddleware, categorySales);
router.get('/summary', authMiddleware, summary);

export default router;
