import api from './api';

export const skillsService = {
  getAll: (params) => api.get('/api/admin/skills', { params }),
  getById: (id) => api.get(`/api/admin/skills/${id}`),
  create: (data) => api.post('/api/admin/skills', data),
  update: (id, data) => api.put(`/api/admin/skills/${id}`, data),
  delete: (id) => api.delete(`/api/admin/skills/${id}`),
  getCount: () => api.get('/api/admin/skills/count'),
};
