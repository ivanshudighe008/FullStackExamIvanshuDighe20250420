import { Request, Response } from 'express';
import Product from '../models/mongo/Product';

export const listProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const products = await Product.find().skip(skip).limit(Number(limit));
  res.json({
    data: products,
    message: 'Products fetched successfully',
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json({
    data: product,
    message: 'Product fetched successfully',
  });
};
