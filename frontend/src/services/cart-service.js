import privateApi from '../api/privateApi';

export default {
    getCart() {
        return privateApi.get('api/carts/items');
    },

    addToCart(productId) {
        return privateApi.post('api/carts/items', {productId: productId});
    },

    removeFromCart(productId) {
        return privateApi.delete(`api/carts/items/${productId}`);
    },

    emptyCart() {
        return privateApi.delete('api/carts/items');
    }
} 