import api from './api';

export const classesService = {
  getAll: (params) => api.get('/api/admin/classes', { params }),
  getById: (id) => api.get(`/api/admin/classes/${id}`),
  create: (data) => api.post('/api/admin/classes', data),
  update: (id, data) => api.put(`/api/admin/classes/${id}`, data),
  delete: (id) => api.delete(`/api/admin/classes/${id}`),
  getCount: () => api.get('/api/admin/classes/count'),
};
