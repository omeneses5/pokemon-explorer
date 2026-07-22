import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Error de red';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
