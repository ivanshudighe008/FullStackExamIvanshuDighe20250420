import { Response } from 'express';
import Order from '../models/sql/Order';
import OrderItem from '../models/sql/OrderItem';
import Cart from '../models/mongo/Cart';
import { AuthenticatedRequest, IProduct } from '../types';

export const checkout = async (req: AuthenticatedRequest, res: Response) => {
  const cart = await Cart.findOne({ userId: req.user?.id }).populate(
    'items.productId'
  );
  if (!cart || cart.items.length === 0) {
    res.status(400).json({ message: 'Cart is empty' });
    return;
  }

  const newOrder = await Order.create({
    userId: req.user?.id,
    total: cart.items.reduce(function (acc, obj) {
      return acc + (obj.quantity || 0);
    }, 0),
  });
  try {
    for (const item of cart.items) {
      const product = item.productId as IProduct;
      await OrderItem.create({
        orderId: newOrder.dataValues.id,
        productId: product?._id?.toString(),
        price: product.price,
        quantity: item.quantity,
      });
    }
    await Cart.deleteOne({ userId: req.user?.id });
    res.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    newOrder.destroy({});
    res.json({ success: false, message: 'Something went wrong!' });
  }
};

export const userOrders = async (req: AuthenticatedRequest, res: Response) => {
  const orders = await Order.findAll({
    where: { userId: req.user?.id },
    include: [OrderItem],
  });
  res.json({
    data: orders,
    message: 'Orders fetched successfully',
  });
};
