import productsModel from '../database/models/products-model';

export default {
  findAll(payload) {
    return productsModel.getAll(payload);
  },

  find(productId) {
    return productsModel.get(productId);
  },

  create({ title, price, description, categoryId }) {
    return productsModel.create({ title, price, description, categoryId });
  },

  update(payload) {
    return productsModel.update(payload);
  },

  delete(productId) {
    return productsModel.delete(productId);
  },
};
