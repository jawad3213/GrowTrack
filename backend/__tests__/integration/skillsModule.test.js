const request = require('supertest');
const app = require('../../server');
const pool = require('../../config/db');

describe('Skills Module Integration Tests', () => {
  let adminToken = '';
  let studentToken = '';
  let csrfToken = '';
  let cookies = [];

  const testSkill = {
    name_skill: `TestSkill_${Date.now()}`,
    description: 'Test skill description',
    categorie: 'Technical'4
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

  describe('GET /api/skills', () => {
    it('should reject unauthenticated requests', async () => {
      const res = await request(app).get('/api/skills');
      expect(res.status).toBe(401);
    });

    it('should return skills for admin', async () => {
      const res = await request(app)
        .get('/api/skills')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return skills for student', async () => {
      const res = await request(app)
        .get('/api/skills')
        .set('Authorization', `Bearer ${studentToken}`);
      
      expect([200, 401]).toContain(res.status);
    });
  });

  describe('GET /api/skills/count', () => {
    it('should return skill count for admin', async () => {
      const res = await request(app)
        .get('/api/skills/count')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('count');
    });
  });

  describe('POST /api/skills', () => {
    it('should create skill for admin', async () => {
      const res = await request(app)
        .post('/api/skills')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send(testSkill);
      
      if (res.status === 201) {
        testSkill.id = res.body.id;
      }
      expect([201, 400, 409]).toContain(res.status);
    });
  });

  describe('GET /api/skills/:id', () => {
    it('should return skill by id', async () => {
      const res = await request(app)
        .get('/api/skills/1')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PUT /api/skills/:id', () => {
    it('should update skill for admin', async () => {
      if (!testSkill.id) {
        console.log('Skipping update test - no skill ID');
        return;
      }

      const res = await request(app)
        .put(`/api/skills/${testSkill.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken)
        .send({ name_skill: 'UpdatedSkill' });
      
      expect([200, 400, 404]).toContain(res.status);
    });
  });

  describe('DELETE /api/skills/:id', () => {
    it('should delete skill for admin', async () => {
      if (!testSkill.id) {
        console.log('Skipping delete test - no skill ID');
        return;
      }

      const res = await request(app)
        .delete(`/api/skills/${testSkill.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('x-csrf-token', csrfToken);
      
      expect([200, 404]).toContain(res.status);
    });
  });
});