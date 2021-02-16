/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Pages', () => {
  after(() => {
    server.server.close();
  });

  describe('/GET pages', () => {
    it('should GET no pages', (done) => {
      chai.request(server)
        .get('/api/pages')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
          done();
        });
    });

    it('should GET 404 for invalid post id', (done) => {
      chai.request(server)
        .get('/api/pages/invalidpostid')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.is.true;
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
