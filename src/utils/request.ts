import axios from 'axios';
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  config => {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mZHdhZG1pbi5jaGFuZ2Nhbm5vbi5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2NjA1NzAzMTUsImV4cCI6MTY2MDU3MzkxNSwibmJmIjoxNjYwNTcwMzE1LCJqdGkiOiJGZUd6YnNUS25YYjJQVEJCIiwic3ViIjoxMCwicHJ2IjoiY2YyODRjMmIxZTA2ZjMzYzI2YmQ1Nzk3NTY2ZDlmZDc0YmUxMWJmNSJ9.nuHHP7ocFIU2OGtbXzvuRa79WWmTU-C8Z9lRaFQyN-8';
    // config.headers!.Authorization = `Bearer ${token}`;
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
