import ordersModel from '../database/models/orders-model';

export default {
  findAll(userId) {
    return ordersModel.getAll(userId);
  },
  create(productId, userId) {
    return ordersModel.create(productId, userId);
  },
  delete(productId, userId) {
    return ordersModel.delete(productId, userId);
  },
};
