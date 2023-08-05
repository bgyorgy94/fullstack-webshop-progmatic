import Sequelize from 'sequelize';

const CategoriesModel = (sequelize) => {
  const Categories = sequelize.define(
    'Categories',
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
  return Categories;
};

export default CategoriesModel;
