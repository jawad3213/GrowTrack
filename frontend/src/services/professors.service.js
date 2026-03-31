import api from './api';

export const professorsService = {
  getAll: (params) => api.get('/api/admin/professors', { params }),
  getById: (id) => api.get(`/api/admin/professors/${id}`),
  create: (data) => api.post('/api/admin/professors', data),
  update: (id, data) => api.put(`/api/admin/professors/${id}`, data),
  delete: (id) => api.delete(`/api/admin/professors/${id}`),
  getCount: () => api.get('/api/admin/professors/count'),
};
