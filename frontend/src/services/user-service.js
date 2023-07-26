import axios from 'axios';
import API_URL from '../constants';

export default {
  register(formData) {
    return axios.post(`${API_URL}/auth/register`, formData);
  },

  login(formData) {
    return axios.post(`${API_URL}/auth/login`, formData);
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
