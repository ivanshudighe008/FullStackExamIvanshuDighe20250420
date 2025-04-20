import { Response } from 'express';
import Cart from '../models/mongo/Cart';
import { AuthenticatedRequest } from '../types';

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  const cart = await Cart.findOne({ userId: req.user?.id }).populate(
    'items.productId'
  );
  res.json({
    data: cart ? cart : { userId: req.user?.id, items: [] },
    message: cart ? 'Cart fetched successfully' : 'Your cart is empty',
  });
};

export const updateCart = async (req: AuthenticatedRequest, res: Response) => {
  const items = [];
  for (const item of req.body.items) {
    const productId =
      typeof item.productId === 'object' ? item.productId._id : item.productId;
    const obj = {
      productId,
      quantity: item.quantity,
    };
    items.push(obj);
  }
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user?.id },
    { $set: { items: req.body.items } },
    { upsert: true, new: true }
  ).populate('items.productId');
  res.json({
    data: cart,
    message: 'Cart updated successfully',
  });
};
