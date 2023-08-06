import Sequelize from 'sequelize';
import MainCategories from './main-categories-model';
import SubCategories from './sub-categories-model';

const ProductsModel = (sequelize) => {
  const Products = sequelize.define(
    'Products',
    {
      title: Sequelize.STRING,
      price: Sequelize.DECIMAL,
      description: Sequelize.TEXT,
      imagePath: Sequelize.STRING,
      mainCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: MainCategories,
          key: 'id',
        },
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: SubCategories,
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
