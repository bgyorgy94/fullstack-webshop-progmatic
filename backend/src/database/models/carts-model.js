import Sequelize from 'sequelize';

const CartsModel = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    'Carts',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      underscored: true,
    },
  );

  return Carts;
};

export default CartsModel;
