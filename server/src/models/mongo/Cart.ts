import mongoose from 'mongoose';
import { ICart } from '../../types';

const cartSchema = new mongoose.Schema({
  userId: Number,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

export default mongoose.model<ICart>('Cart', cartSchema);
