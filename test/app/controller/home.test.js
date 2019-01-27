'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');
const env = require('../../../.env');

describe('test/app/controller/home.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect(app.config.name)
      .expect(200);
  });

  it('should GET /auth', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    return app.httpRequest()
      .get('/auth')
      .set({ Authorization: `bearer ${token}` })
      .expect(200);
  });

  it('should GET /link', async () => {
    await app.httpRequest()
      .get('/link?target=' + encodeURIComponent('https//github.com'))
      .expect(302);
    await app.httpRequest()
      .get('/link')
      .expect(302);
  });

  it('should POST /feedback', async () => {
    return await app.httpRequest()
      .post('/feedback')
      .type('form')
      .send({
        message: 'hi',
        email: 'demo@email.test',
      })
      .expect(200)
      .expect({
        message: 'Feedback sent!',
      });
  });

});
