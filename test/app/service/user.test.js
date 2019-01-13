'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/user.test.js', () => {

  describe('oauthRegister', () => {
    it('should work', async () => {
      const ctx = app.mockUserContext();
      const accessToken = 'abc';
      const refreshToken = 'abc';
      const user = ctx.user;
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      const result = await ctx.service.user.oauthRegister(user);
      assert(result.name === user.name);
      assert(result.avatar === user.photo);
      const existsUser = await ctx.service.user.oauthRegister(user);
      assert(existsUser.name === user.name);
      assert(existsUser.avatar === user.photo);
    });
  });

});
