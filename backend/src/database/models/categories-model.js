import Sequelize from 'sequelize';
import sequelize from '../connection';

const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
});

export default Category;
