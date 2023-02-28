import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const publicRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

export const userRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

userRequest.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('accessToken') as string);
    config['headers']['Authorization'] = 'Bearer ' + token;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
