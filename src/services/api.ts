import axios from 'axios';

const { VITE_BASE_URL = 'http://localhost:3001' } = import.meta.env;

export const instance = axios.create({
  baseURL: VITE_BASE_URL,
});
