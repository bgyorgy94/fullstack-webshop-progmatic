import axios from 'axios';
import API_URL from '../constants';

export default {
  register(formData) {
    return axios.post(`${API_URL}/auth/register`, formData);
  },

  login(formData) {
    return axios.post(`${API_URL}/auth/login`, formData);
  },
};
