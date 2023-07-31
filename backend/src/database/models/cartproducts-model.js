import Sequelize from 'sequelize';

const CartProductsModel = (sequelize) => {
  const CartProducts = sequelize.define('CartProducts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  return CartProducts;
};

export default CartProductsModel;
