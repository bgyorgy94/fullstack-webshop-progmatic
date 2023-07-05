import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll(); // most csináltam
  },

  create(payload) {
    return productsModel.create(payload);
  },
};
