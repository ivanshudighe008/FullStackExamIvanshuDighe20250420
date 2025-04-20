import mongoose from 'mongoose';

export const connectMongo = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
  return mongoose.connect(uri);
};
