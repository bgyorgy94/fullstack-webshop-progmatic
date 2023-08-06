import Sequelize from 'sequelize';
import MainCategories from './main-categories-model';

const SubCategoriesModel = (sequelize) => {
  const SubCategories = sequelize.define(
    'SubCategories',
    {
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mainCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: MainCategories,
          key: 'id',
        },
      },
    },
    {
      underscored: true,
    },
  );
  return SubCategories;
};

export default SubCategoriesModel;
