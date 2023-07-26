import productsModel from '../database/models/products-model';

export default {
  findAll(payload) {
    return productsModel.getAll(payload);
  },

  find(payload) {
    return productsModel.get(payload);
  },

  create(payload) {
    return productsModel.create(payload);
  },

  udpate(payload) {
    return productsModel.update(payload);
  },

  delete(payload) {
    return productsModel.delete(payload);
  },
};
