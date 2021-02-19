/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Posts', () => {
  before((done) => {
    server.on('app_ready', done);
  });

  after((done) => {
    server.server.close(done);
  });

  describe('GET /api/posts', () => {
    it('should GET no posts', (done) => {
      chai.request(server)
        .get('/api/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('size').that.equals(0);
          expect(res.body).to.have.property('posts').that.is.an('array').that.is.empty;
          done();
        });
    });

    it('should GET 404 for invalid post id', (done) => {
      chai.request(server)
        .get('/api/posts/invalidpostid')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.true;
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
