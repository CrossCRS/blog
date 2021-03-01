const request = require('supertest');
const app = require('../app');

describe('Pages', () => {
  const SAMPLE_PAGE_NAME = 'testpage';
  const SAMPLE_PAGE = {
    title: 'A Test Page',
    content: '# Hello\n\n**World**',
    header: true,
    footer: false,
  };

  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  // GET
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

  // PUT
  describe('PUT /api/pages', () => {
    it('should return 403 for POSTs without JWT', async (done) => {
      const res = await request(app)
        .put(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .send(SAMPLE_PAGE);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for POSTs with invalid JWT', async (done) => {
      const res = await request(app)
        .put(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', 'Bearer invalid')
        .send(SAMPLE_PAGE);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 422 for POSTs with missing properties', async (done) => {
      const res = await request(app)
        .put(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send({ name: 'onlyname' });

      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should POST a valid page', async (done) => {
      const res = await request(app)
        .put(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send(SAMPLE_PAGE);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', SAMPLE_PAGE_NAME);
      expect(res.body).toHaveProperty('title', SAMPLE_PAGE.title);
      expect(res.body).toHaveProperty('content', SAMPLE_PAGE.content);
      expect(res.body).toHaveProperty('header', SAMPLE_PAGE.header);
      expect(res.body).toHaveProperty('footer', SAMPLE_PAGE.footer);
      done();
    });
  });

  // PATCH
  describe('PATCH /api/pages', () => {
    it('should return 403 for PATCH with no JWT', async (done) => {
      const res = await request(app)
        .patch(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for PATCH with invalid JWT', async (done) => {
      const res = await request(app)
        .patch(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', 'Bearer invalid')
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for PATCH with invalid page id', async (done) => {
      const res = await request(app)
        .patch('/api/pages/invalidpageid')
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should PATCH a valid change', async (done) => {
      const res = await request(app)
        .patch(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', SAMPLE_PAGE_NAME);
      expect(res.body).toHaveProperty('title', 'New Title');
      expect(res.body).toHaveProperty('content', SAMPLE_PAGE.content);
      expect(res.body).toHaveProperty('header', SAMPLE_PAGE.header);
      expect(res.body).toHaveProperty('footer', SAMPLE_PAGE.footer);
      done();
    });
  });

  // DELETE
  describe('DELETE /api/posts', () => {
    it('should return 403 for DELETE with no JWT', async (done) => {
      const res = await request(app)
        .delete(`/api/pages/${SAMPLE_PAGE_NAME}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for DELETE with invalid JWT', async (done) => {
      const res = await request(app)
        .delete(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', 'Bearer invalid');

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 404 for DELETE with invalid post id', async (done) => {
      const res = await request(app)
        .delete('/api/pages/invalidpageid')
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should DELETE a post', async (done) => {
      const res = await request(app)
        .delete(`/api/pages/${SAMPLE_PAGE_NAME}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
