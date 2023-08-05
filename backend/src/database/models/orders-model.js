import Sequelize from 'sequelize';
import Users from './users-model';

const OrdersModel = (sequelize) => {
  const Orders = sequelize.define(
    'Orders',
    {
      userId: {
        type: Sequelize.STRING,
        references: {
          model: Users,
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      underscored: true,
    },
  );

  return Orders;
};

export default OrdersModel;
