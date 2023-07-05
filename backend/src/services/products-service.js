import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll();
  },

  create(payload) {
    return productsModel.create(payload);
  },
};
