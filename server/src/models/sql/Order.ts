import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/sequelize';
import User from './User';

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.FLOAT },
  createdAt: { type: DataTypes.DATE },
});

Order.sync();
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

export default Order;
