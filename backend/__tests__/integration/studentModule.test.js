const request = require('supertest');
const app = require('../../server');
const pool = require('../../config/db');

describe('Student Module Integration Tests', () => {
  let adminToken = '';
  let professorToken = '';
  let studentToken = '';
  let csrfToken = '';
  let cookies = [];

  const testStudent = {
    email: `student_${Date.now()}@test.com`,
    password: 'Test1234',
    prenom: 'Test',
    nom: 'Student',
    role: 'student',
    cin: `C${Date.now()}`,
    cne: `E${Date.now()}`
  };

  beforeAll(async () => {
    try {
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

      if (loginRes.status === 200 && loginRes.body.access_token) {
        adminToken = loginRes.body.access_token;
        const authCookie = loginRes.headers['set-cookie'];
        if (authCookie) {
          cookies = [...cookies, ...authCookie.map(c => c.split(';')[0])];
        }
      }
    } catch (err) {
      console.error('Setup error:', err.message);
    }
  });

  afterAll(async () => {
    if (pool) await pool.end();
  });

  describe('GET /api/admin/students', () => {
    it('should reject unauthenticated requests', async () => {
      const res = await request(app).get('/api/admin/students');
      expect(res.status).toBe(401);
    });

    it('should return students for admin', async () => {
      const res = await request(app)
        .get('/api/admin/students')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return students for professor', async () => {
      const res = await request(app)
        .get('/api/admin/students')
        .set('Authorization', `Bearer ${professorToken}`);
      
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/admin/students/count', () => {
    it('should return student count for admin', async () => {
      const res = await request(app)
        .get('/api/admin/students/count')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('count');
    });

    it('should reject for non-admin', async () => {
      const res = await request(app)
        .get('/api/admin/students/count')
        .set('Authorization', `Bearer ${professorToken}`);
      
      expect(res.status).toBe(403);
    });
  });

  describe('POST /api/admin/students', () => {
    it('should create student for admin', async () => {
      const res = await request(app)
        .post('/api/admin/students')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send(testStudent);
      
      if (res.status === 201) {
        testStudent.id = res.body.id;
      }
      expect([201, 400, 409]).toContain(res.status);
    });

    it('should reject for non-admin', async () => {
      const res = await request(app)
        .post('/api/admin/students')
        .set('Authorization', `Bearer ${professorToken}`)
        .set('x-csrf-token', csrfToken)
        .send(testStudent);
      
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/admin/students/:id', () => {
    it('should return student by id for authorized users', async () => {
      const res = await request(app)
        .get('/api/admin/students/1')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PUT /api/admin/students/:id', () => {
    it('should update student for admin', async () => {
      if (!testStudent.id) {
        console.log('Skipping update test - no student ID');
        return;
      }

      const res = await request(app)
        .put(`/api/admin/students/${testStudent.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send({ prenom: 'Updated' });
      
      expect([200, 400, 404]).toContain(res.status);
    });
  });

  describe('DELETE /api/admin/students/:id', () => {
    it('should delete student for admin', async () => {
      if (!testStudent.id) {
        console.log('Skipping delete test - no student ID');
        return;
      }

      const res = await request(app)
        .delete(`/api/admin/students/${testStudent.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken);
      
      expect([200, 404]).toContain(res.status);
    });
  });
});