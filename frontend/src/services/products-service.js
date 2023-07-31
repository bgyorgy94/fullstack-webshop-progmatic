import privateApi from '../api/privateApi';
import publicApi from '../api/publicApi';
import privatePostApi from '../api/privatePostApi';

export default {
    getAllProducts(params) {
        return publicApi.get('api/products', {
            params: {
                orderBy: params.get('orderBy'),
                order: params.get('order'),
                title: params.get('title'),
                minPrice: params.get('minPrice'),
                maxPrice: params.get('maxPrice')
            }
        });
    },

    addProduct(formData) {
        return privatePostApi.post('api/products', formData)
    },

    modifyProduct(id, formData) {
        return privatePostApi.put(`api/products/${id}`, formData)
    },

    getProductById(id) {
        return publicApi.get(`api/products/${id}`)
    }
}