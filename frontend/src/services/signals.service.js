import api from './api';

export const signalsService = {
  getAll: (params) => api.get('/api/signals', { params }),
  getById: (id) => api.get(`/api/signals/${id}`),
  create: (data) => api.post('/api/signals', data),
  update: (id, data) => api.put(`/api/signals/${id}`, data),
  resolve: (id, resolution) => api.put(`/api/signals/${id}/resolve`, { resolution }),
  getCount: () => api.get('/api/signals/count'),
};
