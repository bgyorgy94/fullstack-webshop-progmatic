import Sequelize from 'sequelize';
import sequelize from '../connection';
import User from './users-model';
import Product from './products-model';

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

const OrderProduct = sequelize.define('OrderProduct', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: Sequelize.INTEGER,
  price: Sequelize.DECIMAL,
});

export default { Order, OrderProduct };
