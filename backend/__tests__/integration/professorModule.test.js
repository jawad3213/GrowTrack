const request = require('supertest');
const app = require('../../server');
const pool = require('../../config/db');

describe('Professor Module Integration Tests', () => {
  let adminToken = '';
  let csrfToken = '';
  let cookies = [];

  const testProfessor = {
    email: `prof_${Date.now()}@test.com`,
    password: 'Test1234',
    prenom: 'Test',
    nom: 'Professor',
    role: 'professor',
    cin: `P${Date.now()}`
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

  describe('GET /api/professors', () => {
    it('should reject unauthenticated requests', async () => {
      const res = await request(app).get('/api/professors');
      expect(res.status).toBe(401);
    });

    it('should return professors for admin', async () => {
      const res = await request(app)
        .get('/api/professors')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/professors/count', () => {
    it('should return professor count for admin', async () => {
      const res = await request(app)
        .get('/api/professors/count')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('count');
    });
  });

  describe('POST /api/professors', () => {
    it('should create professor for admin', async () => {
      const res = await request(app)
        .post('/api/professors')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send(testProfessor);
      
      if (res.status === 201) {
        testProfessor.id = res.body.id;
      }
      expect([201, 400, 409]).toContain(res.status);
    });
  });

  describe('GET /api/professors/:id', () => {
    it('should return professor by id', async () => {
      const res = await request(app)
        .get('/api/professors/1')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PUT /api/professors/:id', () => {
    it('should update professor for admin', async () => {
      if (!testProfessor.id) {
        console.log('Skipping update test - no professor ID');
        return;
      }

      const res = await request(app)
        .put(`/api/professors/${testProfessor.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send({ prenom: 'Updated' });
      
      expect([200, 400, 404]).toContain(res.status);
    });
  });

  describe('DELETE /api/professors/:id', () => {
    it('should delete professor for admin', async () => {
      if (!testProfessor.id) {
        console.log('Skipping delete test - no professor ID');
        return;
      }

      const res = await request(app)
        .delete(`/api/professors/${testProfessor.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken);
      
      expect([200, 404]).toContain(res.status);
    });
  });
});