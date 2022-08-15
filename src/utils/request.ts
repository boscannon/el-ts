import axios from 'axios';
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message: string = error.message;

    ElMessage({
      message: message,
      type: 'error',
      duration: 3 * 1000,
    });

    return Promise.reject(error);
  },
);

export default service;
