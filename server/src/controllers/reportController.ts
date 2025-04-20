import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../configs/sequelize';
import '../models/mongo/Category';
import Product from '../models/mongo/Product';
import User from '../models/sql/User';
import Order from '../models/sql/Order';
import { ICategory } from '../types';

export const dailyRevenue = async (_: Request, res: Response) => {
  const [results] = await sequelize.query(`
    SELECT DATE(createdAt) as date, SUM(total) as revenue
    FROM Orders
    GROUP BY DATE(createdAt)
    ORDER BY date DESC
    LIMIT 7;
  `);
  res.json({
    data: results,
    message: 'Daily Revenue fecthed successfully',
  });
};

export const topSpenders = async (_: Request, res: Response) => {
  try {
    const [results] = await sequelize.query(`
      SELECT Users.email, SUM(Orders.total) as totalSpent
      FROM Users
      JOIN Orders ON Orders.userId = Users.id
      GROUP BY Users.email
      ORDER BY totalSpent DESC
      LIMIT 3;
    `);
    res.json({
      data: results,
      message: 'Top spenders fecthed successfully',
    });
  } catch (error) {
    res.json({
      data: null,
      message: 'Something went wrong!',
    });
  }
};

export const categorySales = async (_: Request, res: Response) => {
  try {
    // Get total quantity sold per product from MySQL (OrderItem table)
    const [salesData]: any = await sequelize.query(`
      SELECT productId, SUM(quantity) as totalSold
      FROM OrderItems
      GROUP BY productId
    `);

    // Get product category mappings from MongoDB
    const productIds = salesData.map((item: any) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } })
      .populate('category')
      .lean();

    // Map productId -> category
    const productCategoryMap: Record<string, string> = {};
    for (const product of products) {
      const category = product.category as ICategory;
      productCategoryMap[product._id.toString()] = category.name.toString();
    }

    // Aggregate totals per category
    const categoryTotals: Record<string, number> = {};
    for (const sale of salesData) {
      const category = productCategoryMap[sale.productId];
      if (category) {
        categoryTotals[category] =
          (categoryTotals[category] || 0) + Number(sale.totalSold);
      }
    }

    const result = Object.entries(categoryTotals)
      .map(([category, totalSold]) => ({ category, totalSold }))
      .sort((a, b) => b.totalSold - a.totalSold);

    res.json({
      data: result,
      message: 'Category sales fetched successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: 'Failed to fetch category sales',
    });
  }
};

export const summary = async (_: Request, res: Response) => {
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
