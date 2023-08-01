import privateApi from '../api/privateApi';
import publicApi from '../api/publicApi';
import privatePostApi from '../api/privatePostApi';

export default {
  getAllProducts(params) {
    return publicApi.get('api/products', {
      params: {
        page: params.page || 1,
        orderBy: params.searchParams.get('orderBy'),
        order: params.searchParams.get('order'),
        title: params.searchParams.get('title'),
        minPrice: params.searchParams.get('minPrice'),
        maxPrice: params.searchParams.get('maxPrice'),
      },
    });
  },

  addProduct(formData) {
    return privatePostApi.post('api/products', formData);
  },

  modifyProduct(id, formData) {
    return privatePostApi.put(`api/products/${id}`, formData);
  },

  deleteProduct(id) {
    return privateApi.delete(`api/products/${id}`);
  },

  getProductById(id) {
    return publicApi.get(`api/products/${id}`);
  },
};
