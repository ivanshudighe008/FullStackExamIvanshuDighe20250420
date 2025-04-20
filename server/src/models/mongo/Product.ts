import mongoose from 'mongoose';
import { IProduct } from '../../types';

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: Number,
    stock: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
