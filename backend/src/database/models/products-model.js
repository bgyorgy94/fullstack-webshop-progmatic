import Sequelize from 'sequelize';
import sequelize from '../connection';
import Category from './categories-model';

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  description: Sequelize.TEXT,
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

export default Product;
