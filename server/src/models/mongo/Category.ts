import mongoose from 'mongoose';
import { ICategory } from '../../types';

const categorySchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model<ICategory>('Category', categorySchema);
