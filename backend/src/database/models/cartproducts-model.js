import Sequelize from 'sequelize';

const CartProductsModel = (sequelize, DataTypes) => {
  const CartProducts = sequelize.define('CartProducts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: Sequelize.INTEGER,
  });

  return CartProducts;
};

export default CartProductsModel;
