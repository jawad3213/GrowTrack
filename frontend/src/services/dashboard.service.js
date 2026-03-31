import api from './api';

export const dashboardService = {
  getStats: () => api.get('/api/dashboard/stats'),
  getRecentActivities: (limit = 10) => api.get('/api/dashboard/activities', { params: { limit } }),
};
