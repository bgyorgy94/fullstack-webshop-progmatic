import Sequelize from 'sequelize';
import Categories from './categories-model';

const ProductsModel = (sequelize) => {
  const Products = sequelize.define(
    'Products',
    {
      title: Sequelize.STRING,
      price: Sequelize.DECIMAL,
      description: Sequelize.TEXT,
      imagepath: Sequelize.STRING,
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
