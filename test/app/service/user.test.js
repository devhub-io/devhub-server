'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/user.test.js', () => {

  describe('oauthRegister', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const accessToken = 'abc';
      const refreshToken = 'abc';
      const params = {
        access_token: 'abc',
      };
      const user = {
        provider: 'github',
        id: 1,
        name: 'demo',
        displayName: 'test',
        photo: 'http://photeo.jpg',
        accessToken,
        refreshToken,
        params,
        profile: params,
      };
      const result = await ctx.service.user.oauthRegister(user);
      assert(result.name === user.name);
      assert(result.avatar === user.photo);
      const existsUser = await ctx.service.user.oauthRegister(user);
      assert(existsUser.name === user.name);
      assert(existsUser.avatar === user.photo);
    });
  });

});
