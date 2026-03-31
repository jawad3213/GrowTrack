import api from './api';

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  refreshToken: () => api.post('/api/auth/refresh', {}),
  checkAuth: () => api.get('/api/auth/check'),
  resetPassword: (email) => api.post('/api/auth/reset-pass', { email }),
  confirmResetPassword: (token, password) => api.post('/api/auth/reset-pass-confirm', { token, password }),
};
