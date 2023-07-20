import cartModel from '../database/models/cart-model';

export default {
  add(payload) {
    return cartModel.getItem(payload).then((resp) => {
      if (!resp) {
        return cartModel.create(payload);
      }
      return cartModel.add(payload);
    });
  },

  getAll(payload) {
    return cartModel.getAll(payload);
  },

  delete(payload) {
    return cartModel.getItem(payload).then((resp) => {
      if (resp.quantity === 1) {
        return cartModel.delete(payload);
      }
      return cartModel.subtract(payload);
    });
  },

  deleteAll(payload) {
    return cartModel.deleteAll(payload);
  },
};
