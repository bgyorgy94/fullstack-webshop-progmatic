import Sequelize from 'sequelize';

const OrderProductsModel = (sequelize) => {
  const OrderProducts = sequelize.define('OrderProducts', {
    quantity: Sequelize.INTEGER,
    price: Sequelize.DECIMAL,
  });

  return OrderProducts;
};

export default OrderProductsModel;
