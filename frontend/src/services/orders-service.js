import publicApi from '../api/publicApi';

export default {
  getAllOrders(params) {
    console.log('Frontend Params:', params);
    return publicApi.get('api/orders', {
      params: {
        page: params.page || 1,
        orderBy: params.searchParams.get('orderBy'),
        order: params.searchParams.get('order'),
        title: params.searchParams.get('title'),
      },
    });
  },
};
