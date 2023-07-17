import axios from 'axios';
import API_URL from '../constants';

const publicApi = axios.create({
  baseURL: `${API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

export default publicApi;
