import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const login = async (type, credentials) => {
  const response = await axios.post(`${API_URL}/auth/${type}/login`, credentials);
  return response.data;
};

export const register = async (type, userData) => {
  const response = await axios.post(`${API_URL}/auth/${type}/register`, userData);
  return response.data;
};