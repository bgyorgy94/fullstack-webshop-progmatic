import publicApi from "../api/publicApi";

export default {
  getAllCategories() {
    return publicApi.get('/categories');
  },
};