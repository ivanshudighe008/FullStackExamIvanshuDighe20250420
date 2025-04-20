import { sequelize } from '../configs/sequelize';
import User from '../models/sql/User';
import bcrypt from 'bcrypt';

const seedSQL = async () => {
  await sequelize.sync({ force: true });

  const password = await bcrypt.hash('test123', 10);
  const users = await User.bulkCreate([
    { name: 'Admin', email: 'admin@example.com', password },
    { name: 'Ivanshu', email: 'ivanshu@example.com', password },
  ]);

  console.log('MySQL Users Seeded');
  process.exit();
};

seedSQL();
