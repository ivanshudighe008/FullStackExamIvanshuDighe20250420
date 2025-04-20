import express from 'express';
import {
  categorySales,
  dailyRevenue,
  topSpenders,
  summary,
} from '../controllers/reportController';
const router = express.Router();

router.get('/daily-revenue', dailyRevenue);
router.get('/top-spenders', topSpenders);
router.get('/category-sales', categorySales);
router.get('/summary', summary);

export default router;
