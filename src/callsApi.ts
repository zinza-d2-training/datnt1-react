import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const publicRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL
});
