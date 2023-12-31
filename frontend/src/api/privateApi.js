import axios from 'axios';
import API_URL from '../constants';

const privateApi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

export default privateApi;
