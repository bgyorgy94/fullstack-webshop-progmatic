import publicApi from '../api/publicApi';

export default {
    getAllProducts() {
        return publicApi.get('api/products');
    }
}