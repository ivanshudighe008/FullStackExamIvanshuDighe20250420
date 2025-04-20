import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | { id: string; role: string }; // customize this to match your real user object
}

export interface ICategory extends Document {
  name: String;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: Types.ObjectId | ICategory;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  productId: Types.ObjectId | IProduct; // can be ObjectId or populated Product
  quantity: number;
}

export interface ICart extends Document {
  userId: number;
  items: ICartItem[];
}
