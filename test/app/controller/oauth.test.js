'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/oauth.test.js', () => {

  it('should GET /passport/github', () => {
    return app.httpRequest()
      .get('/passport/github')
      .expect(302);
  });

  it('should GET /passport/github/callback', () => {
    return app.httpRequest()
      .get('/passport/github/callback?code=123456')
      .expect(302);
  });

});
