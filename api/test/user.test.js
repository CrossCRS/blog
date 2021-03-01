const request = require('supertest');
const app = require('../app');

describe('Users', () => {
  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  describe('GET /api/users', () => {
    it('should GET a valid user', async (done) => {
      const res = await request(app)
        .get(`/api/users/${app.tests.user_admin.username}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toHaveProperty('password');
      done();
    });
  });

  describe('GET /api/users', () => {
    it('should GET 404 for invalid user', async (done) => {
      const res = await request(app)
        .get('/api/users/invaliduser');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
