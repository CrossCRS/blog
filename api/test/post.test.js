const request = require('supertest');
const app = require('../app');

describe('Posts', () => {
  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  describe('GET /api/posts', () => {
    it('should GET no posts', async (done) => {
      const res = await request(app)
        .get('/api/posts');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('size', 0);
      expect(res.body).toHaveProperty('posts');
      done();
    });

    it('should GET 404 for invalid post id', async (done) => {
      const res = await request(app)
        .get('/api/posts/invalidpostid');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
