import publicApi from '../api/publicApi';

export default {
  register(formData) {
    return publicApi.post('auth/register', formData);
  },

  login(formData) {
    return publicApi.post('auth/login', formData);
  },

  find(data) {
    return publicApi.get(`api/users/${data.id}`, {
      headers: { authorization: `BEARER ${data.token}` },
    });
  },

  update(id, data) {
    return publicApi.patch(`api/users/${id}`, data, {
      headers: { authorization: `BEARER ${data.userData.token}` },
    });
  },

  delete(data) {
    return publicApi.delete(`api/users/${data.id}`, {
      headers: { authorization: `BEARER ${data.token}` },
    });
  },
};
