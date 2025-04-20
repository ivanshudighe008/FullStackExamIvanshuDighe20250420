import express from 'express';
import {
  categorySales,
  dailyRevenue,
  topSpenders,
} from '../controllers/reportController';
const router = express.Router();

router.get('/daily-revenue', dailyRevenue);
router.get('/top-spenders', topSpenders);
router.get('/category-sales', categorySales);

export default router;
