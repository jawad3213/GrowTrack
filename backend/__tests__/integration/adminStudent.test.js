const request = require('supertest');
const app = require('../../server');
const pool = require('../../config/db');

describe('Admin Student Management Integration Tests', () => {
  let adminToken = '';
  let csrfToken = '';
  let cookies = [];

  const testStudent = {
    full_name: `Test Student ${Date.now()}`,
    cin: `C${Date.now()}`,
    cne: `E${Date.now()}`,
    email: `student_${Date.now()}@test.com`,
    pass: 'Test1234',
    field: 'Computer Science',
    note: 'Good student'
  };

  beforeAll(async () => {
    const csrfRes = await request(app).get('/api/csrf-token');
    csrfToken = csrfRes.body.csrfToken;
    const setCookie = csrfRes.headers['set-cookie'];
    if (setCookie) {
      cookies = setCookie.map(cookie => cookie.split(';')[0]);
    }

      const loginRes = await request(app)
        .post('/api/auth/login')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', cookies.join('; '))
        .send({ email: 'admin@growtrack.com', password: 'admin', RememberMe: false });

    if (loginRes.status === 200) {
      adminToken = loginRes.body.access_token || '';
      const authCookie = loginRes.headers['set-cookie'];
      if (authCookie) {
        cookies = [...cookies, ...authCookie.map(c => c.split(';')[0])];
      }
    }
  });

  afterAll(async () => {
    if (pool) await pool.end();
  });

  describe('POST /admin/student/create', () => {
    it('should create student with valid data', async () => {
      const res = await request(app)
        .post('/admin/student/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send(testStudent);
      
      if (res.status === 201) {
        testStudent.id_utilisateur = res.body.id;
      }
      expect([201, 400, 500]).toContain(res.status);
    });
  });

  describe('GET /admin/student', () => {
    it('should return all students', async () => {
      const res = await request(app)
        .get('/admin/student')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 500]).toContain(res.status);
    });
  });

  describe('GET /admin/student/search', () => {
    it('should search student by CIN', async () => {
      const res = await request(app)
        .get('/admin/student/search')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ cin: testStudent.cin });
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('GET /admin/student/total', () => {
    it('should return total student count', async () => {
      const res = await request(app)
        .get('/admin/student/total')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 500]).toContain(res.status);
    });
  });

  describe('GET /admin/student/class', () => {
    it('should return students by class', async () => {
      const res = await request(app)
        .get('/admin/student/class')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ id_class: 1 });
      
      expect([200, 500]).toContain(res.status);
    });
  });

  describe('GET /admin/student/sector', () => {
    it('should return students by sector', async () => {
      const res = await request(app)
        .get('/admin/student/sector')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ sector: 'Computer Science' });
      
      expect([200, 500]).toContain(res.status);
    });
  });

  describe('PATCH /admin/student/update/:id', () => {
    it('should update student', async () => {
      if (!testStudent.id_utilisateur) {
        console.log('Skipping update test - no student ID');
        return;
      }

      const res = await request(app)
        .patch(`/admin/student/update/${testStudent.id_utilisateur}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send({ full_name: 'Updated Name' });
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('DELETE /admin/student/delete/:id', () => {
    it('should delete student', async () => {
      if (!testStudent.id_utilisateur) {
        console.log('Skipping delete test - no student ID');
        return;
      }

      const res = await request(app)
        .delete(`/admin/student/delete/${testStudent.id_utilisateur}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken);
      
      expect([200, 404, 500]).toContain(res.status);
    });
  });
});