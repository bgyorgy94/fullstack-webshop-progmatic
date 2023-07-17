import userOrdersModel from '../database/models/user-orders-model';

export default {
  findAll(userId) {
    return userOrdersModel.getAll(userId);
  },
  find(userId, orderId) {
    return userOrdersModel.getById(userId, orderId);
  },
  create(userId) {
    return userOrdersModel.create(userId);
  },
  delete(userId, orderId) {
    return userOrdersModel.delete(userId, orderId);
  },
};
