import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { sequelize } from './configs/sequelize';
import { connectMongo } from './configs/mongoose';
import routes from './routes/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', routes);
app.all('/', (_, res) => {
  res.send('E-commerce API running');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL with Sequelize');

    await connectMongo();
    console.log('Connected to MongoDB with Mongoose');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
