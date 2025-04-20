import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/sequelize';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});
User.sync();

export default User;
