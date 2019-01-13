'use strict';

const { app, assert } = require('egg-mock/bootstrap');
// const jwt = require('jsonwebtoken');
// const env = require('../../../.env');

describe('test/app/controller/home.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect(app.config.app_name)
      .expect(200);
  });

  it('should GET /auth', async () => {
    // const user = await app.factory.create('user');
    // const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    // console.log(token);
    // const ctx = app.mockContext({
    //   headers: {
    //     Authorization: `bearer ${token}`,
    //   },
    // });
    return app.httpRequest()
      // .set('Authorization', `bearer ${token}`)
      .get('/auth')
      .expect(401);
  });

  it('should GET /admin', () => {
    return app.httpRequest()
      .get('/admin')
      .expect(401);
  });

});
