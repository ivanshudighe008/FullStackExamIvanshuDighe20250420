import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/mongo/Product';
import Category from '../models/mongo/Category';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  await Product.deleteMany({});
  await Category.deleteMany({});

  const electronics = await Category.create({ name: 'Electronics' });
  const fashion = await Category.create({ name: 'Fashion' });

  await Product.insertMany([
    {
      name: 'Wireless Earbuds',
      price: 49.99,
      category: electronics._id,
      stock: 100,
    },
    {
      name: 'Stylish Jacket',
      price: 89.99,
      category: fashion._id,
      stock: 50,
    },
  ]);

  console.log('MongoDB Categories and Products seeded');
  process.exit();
};

seed();
