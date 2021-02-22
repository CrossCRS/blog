/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  before((done) => {
    server.on('app_ready', done);
  });

  after((done) => {
    server.server.close(done);
  });

  describe('GET /api/users', () => {
    it('should GET a valid user', (done) => {
      chai.request(server)
        .get(`/api/users/${server.tests.user_admin.username}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
