const request = require('supertest');
const app = require('../app');

describe('Posts', () => {
  const SAMPLE_POST = {
    title: 'A Test Post',
    content: '# Hello\n\n**World**',
  };
  let samplePostId;

  beforeAll((done) => {
    app.on('app_ready', done);
  });

  afterAll(async () => {
    await app.db.disconnect();
    await app.dbServer.stop();
    await app.server.close();
  });

  // GET
  describe('GET /api/posts', () => {
    it('should GET no posts', async (done) => {
      const res = await request(app)
        .get('/api/posts');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('size', 0);
      expect(res.body).toHaveProperty('posts');
      done();
    });

    it('should return 404 for GETs with invalid post id', async (done) => {
      const res = await request(app)
        .get('/api/posts/invalidpostid');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });

  // POST
  describe('POST /api/posts', () => {
    it('should return 403 for POSTs without JWT', async (done) => {
      const res = await request(app)
        .post('/api/posts')
        .send(SAMPLE_POST);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for POSTs with invalid JWT', async (done) => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', 'Bearer invalid')
        .send(SAMPLE_POST);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 422 for POSTs with missing properties', async (done) => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send({ title: 'Only Title' });

      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should POST a valid post', async (done) => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send(SAMPLE_POST);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', SAMPLE_POST.title);
      expect(res.body).toHaveProperty('content', SAMPLE_POST.content);
      samplePostId = res.body._id;
      done();
    });
  });

  // PATCH
  describe('PATCH /api/posts', () => {
    it('should return 403 for PATCH with no JWT', async (done) => {
      const res = await request(app)
        .patch(`/api/posts/${samplePostId}`)
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for PATCH with invalid JWT', async (done) => {
      const res = await request(app)
        .patch(`/api/posts/${samplePostId}`)
        .set('Authorization', 'Bearer invalid')
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should PATCH a valid change', async (done) => {
      const res = await request(app)
        .patch(`/api/posts/${samplePostId}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`)
        .send({ title: 'New Title' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'New Title');
      expect(res.body).toHaveProperty('content', SAMPLE_POST.content);
      done();
    });
  });

  // DELETE
  describe('DELETE /api/posts', () => {
    it('should return 403 for DELETE with no JWT', async (done) => {
      const res = await request(app)
        .delete(`/api/posts/${samplePostId}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 403 for DELETE with invalid JWT', async (done) => {
      const res = await request(app)
        .delete(`/api/posts/${samplePostId}`)
        .set('Authorization', 'Bearer invalid');

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should return 404 for DELETE with invalid post id', async (done) => {
      const res = await request(app)
        .delete('/api/posts/invalidpostid')
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', true);
      expect(res.body).toHaveProperty('message');
      done();
    });

    it('should DELETE a post', async (done) => {
      const res = await request(app)
        .delete(`/api/posts/${samplePostId}`)
        .set('Authorization', `Bearer ${app.tests.jwt_admin}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
