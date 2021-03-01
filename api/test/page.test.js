const request = require('supertest');
const app = require('../app');

describe('Pages', () => {
  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  describe('GET /api/pages', () => {
    it('should GET no pages', async (done) => {
      const res = await request(app)
        .get('/api/pages');

      expect(res.statusCode).toEqual(200);
      done();
    });

    it('should GET 404 for invalid page id', async (done) => {
      const res = await request(app)
        .get('/api/pages/invalidpageid');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
