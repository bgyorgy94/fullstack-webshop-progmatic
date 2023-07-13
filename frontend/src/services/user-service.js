import publicApi from '../api/publicApi';

export default {
  register(formData) {
    return publicApi.post('auth/register', formData);
  },

  login(formData) {
    return publicApi.post('auth/login', formData);
  },
};
