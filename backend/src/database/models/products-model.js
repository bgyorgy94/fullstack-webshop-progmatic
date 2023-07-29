import Sequelize from 'sequelize';
import Categories from './categories-model';

const ProductsModel = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
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
          model: Categories,
          key: 'id',
        },
      },
    },
    {
      underscored: true,
    },
  );

  return Products;
};

export default ProductsModel;
