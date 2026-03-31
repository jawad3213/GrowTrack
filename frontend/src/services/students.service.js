import api from './api';

export const studentsService = {
  getAll: (params) => api.get('/api/admin/students', { params }),
  getById: (id) => api.get(`/api/admin/students/${id}`),
  create: (data) => api.post('/api/admin/students', data),
  update: (id, data) => api.put(`/api/admin/students/${id}`, data),
  delete: (id) => api.delete(`/api/admin/students/${id}`),
  getCount: () => api.get('/api/admin/students/count'),
  importCSV: (file) => api.post('/api/admin/students/import', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
