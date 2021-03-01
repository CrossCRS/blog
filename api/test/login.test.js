const request = require('supertest');
const app = require('../app');

describe('Login', () => {
  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  describe('POST /api/login', () => {
    it('should return a token for valid requests', async (done) => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: app.tests.user_admin.email, password: app.tests.user_admin_password });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      done();
    });

    it('should return 401 for requests with invalid credentials', async (done) => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'invalid@email.com', password: 'admin1' });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 422 for requests with invalid payload', async (done) => {
      const res = await request(app)
        .post('/api/login')
        .send({ sample: 'test' });

      expect(res.statusCode).toEqual(422);
      done();
    });

    it('should return 422 for requests with invalid email', async (done) => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'abc', password: 'admin1' });

      expect(res.statusCode).toEqual(422);
      done();
    });

    it('should return 422 for requests with no password', async (done) => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: 'admin@blog.dev' });

      expect(res.statusCode).toEqual(422);
      done();
    });
  });
});
