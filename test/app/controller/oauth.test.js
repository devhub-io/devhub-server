'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/oauth.test.js', () => {

  it('should GET /passport/github', () => {
    return app.httpRequest()
      .get('/passport/github')
      .expect(302);
  });

  it('should GET /passport/github/callback', () => {
    app.mockHttpclient('https://github.com/login/oauth/access_token', {
      data: {
        token_type: 'bearer',
        scope: 'repo,gist',
        access_token: 'e72e16c7e42f292c6912e7710c838347ae178b4a',
      },
    });
    app.mockHttpclient('https://api.github.com/user', {
      data: {
        provider: 'github',
        id: 1,
        name: 'mock_name',
        displayName: 'mock displayName',
        photo:
          'https://tva2.sinaimg.cn/crop.0.0.180.180.180/61c56ebcjw1e8qgp5bmzyj2050050aa8.jpg',
        profile:
          { photos: [[ Object ]],
            _raw: '{}',
            _json:
              { id: '10086',
                screen_name: 'mock_name',
                displayName: 'mock displayName' } } },
    });
    return app.httpRequest()
      .get('/passport/github/callback?code=123456')
      .expect(302);
  });

});
