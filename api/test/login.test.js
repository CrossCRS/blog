/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Login', () => {
  before((done) => {
    server.on('app_ready', done);
  });

  after((done) => {
    server.server.close(done);
  });

  describe('POST /api/login', () => {
    it('should return a token for valid requests', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ email: server.tests.user_admin.email, password: server.tests.user_admin_password })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token').that.is.a('string');
          done();
        });
    });

    it('should return 401 for requests with invalid credentials', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ email: 'invalid@email.com', password: 'admin1' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').that.is.true;
          expect(res.body).to.have.property('message');
          done();
        });
    });

    it('should return 422 for requests with invalid payload', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ sample: 'test' })
        .end((err, res) => {
          expect(res).to.have.status(422);
          done();
        });
    });

    it('should return 422 for requests with invalid email', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ email: 'abc', password: 'admin1' })
        .end((err, res) => {
          expect(res).to.have.status(422);
          done();
        });
    });

    it('should return 422 for requests with no password', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ email: 'admin@blog.dev' })
        .end((err, res) => {
          expect(res).to.have.status(422);
          done();
        });
    });
  });
});
