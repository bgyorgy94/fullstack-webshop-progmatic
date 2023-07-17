import privateApi from '../api/privateApi';

export default {
    getCart() {
        return privateApi.get('api/cart');
    }
}