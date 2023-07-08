import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll();
  },

  find(payload) {
    return productsModel.get(payload);
  },

  create(payload) {
    return productsModel.create(payload);
  },

  delete(payload) {
    return productsModel.delete(payload);
  },
};
