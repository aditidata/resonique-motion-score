import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({ baseURL: `${API_URL}/api` });

export const authApi = axios.create({ baseURL: `${API_URL}/api` });

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchTopPlayers = async () => (await api.get('/leaderboard')).data;