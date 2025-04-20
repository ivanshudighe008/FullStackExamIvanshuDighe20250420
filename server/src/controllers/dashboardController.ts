import { Request, Response } from 'express';
import User from '../models/sql/User';
import Order from '../models/sql/Order';
import Product from '../models/mongo/Product';
import { sequelize } from '../configs/sequelize';
import { QueryTypes } from 'sequelize';

export const getDashboard = async (_: Request, res: Response) => {
  try {
    const [userCount, productCount, orderCount] = await Promise.all([
      User.count(),
      Product.countDocuments(),
      Order.count(),
    ]);

    interface RevenueResult {
      totalRevenue: number | null;
    }
    const [revenueResult] = await sequelize.query<RevenueResult>(
      `
      SELECT SUM(total) as totalRevenue FROM Orders
    `,
      {
        type: QueryTypes.SELECT,
      }
    );

    const totalRevenue = revenueResult?.totalRevenue || 0;

    res.json({
      data: {
        users: userCount,
        products: productCount,
        orders: orderCount,
        revenue: totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin dashboard data' });
  }
};
