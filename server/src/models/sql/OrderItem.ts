import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/sequelize';
import Order from './Order';

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT },
  quantity: { type: DataTypes.INTEGER },
});
OrderItem.sync();
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

export default OrderItem;
