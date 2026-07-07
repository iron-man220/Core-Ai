import axios from 'axios';

// 🔹 Define proper API_URL using Vite environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 User related API endpoints
export const userAPI = {
  signup: (data) => api.post('/users/signup', data).then((res) => res.data),
  login: (data) => api.post('/users/login', data).then((res) => res.data),
  googleAuth: (data) => api.post('/users/google-auth', data).then((res) => res.data),
};

export default api;
