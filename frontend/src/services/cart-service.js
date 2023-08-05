import privateApi from '../api/privateApi';

export default {
  getCart() {
    return privateApi.get('api/carts');
  },

  addToCart(productId) {
    return privateApi.post('api/carts', { productId });
  },

  removeFromCart(productId) {
    return privateApi.delete(`api/carts/${productId}`);
  },

  instantRemoveFromCart(productId) {
    return privateApi.delete(`api/carts/remove/${productId}`);
  },

  emptyCart() {
    return privateApi.delete('api/carts');
  },
};
