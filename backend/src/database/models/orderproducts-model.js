import Sequelize from 'sequelize';

const OrderProductsModel = (sequelize, DataTypes) => {
  const OrderProducts = sequelize.define('OrderProducts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: Sequelize.INTEGER,
    price: Sequelize.DECIMAL,
  });

  return OrderProducts;
};

export default OrderProductsModel;
