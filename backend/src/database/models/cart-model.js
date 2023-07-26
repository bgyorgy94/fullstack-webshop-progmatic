import Sequelize from 'sequelize';
import sequelize from '../connection';
import User from './users-model';
import Product from './products-model';

const Cart = sequelize.define('Cart', {
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
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: Sequelize.INTEGER,
});

export default Cart;
