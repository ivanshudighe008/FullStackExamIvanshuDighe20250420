import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // important for Railway's managed SSL
      }
    },
    logging: false,
  }
);
