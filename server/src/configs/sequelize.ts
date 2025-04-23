import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);
