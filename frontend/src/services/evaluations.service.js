import api from './api';

export const evaluationsService = {
  getAll: (params) => api.get('/api/evaluations', { params }),
  getById: (id) => api.get(`/api/evaluations/${id}`),
  create: (data) => api.post('/api/evaluations', data),
  update: (id, data) => api.put(`/api/evaluations/${id}`, data),
  getCount: () => api.get('/api/evaluations/count'),
};
