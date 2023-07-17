import ordersModel from '../database/models/orders-model';

export default {
  findAll(userId) {
    return ordersModel.getAll(userId);
  },
  find(userId, orderId) {
    return ordersModel.getById(userId, orderId);
  },
  create(userId) {
    return ordersModel.create(userId);
  },
  delete(userId, orderId) {
    return ordersModel.delete(userId, orderId);
  },
};
