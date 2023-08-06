import Sequelize from 'sequelize';

const MainCategoriesModel = (sequelize) => {
  const MainCategories = sequelize.define(
    'MainCategories',
    {
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
    },
  );
  return MainCategories;
};

export default MainCategoriesModel;
