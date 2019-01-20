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

  describe('Token', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const nullUserId = await ctx.service.user.selectUserId();
      const nullUserToken = await ctx.service.user.userGithubToken({ id: 3 });
      assert(nullUserId === null);
      assert(nullUserToken === null);

      const token = '4796692f0e48d6584ef15764cda9581f599eceed';
      const user = await app.factory.create('repos', {
        email: 'demo@email.local',
        password: 'abc',
        created_at: new Date(),
        updated_at: new Date(),
        last_activated_at: new Date(),
      });
      await app.factory.create('service', {
        user_id: user.id,
        provider: 'github',
        token,
        secret: '',
        refresh_token: '',
        expires_at: new Date('2999-01-01 00:00:00'),
        created_at: new Date(),
        updated_at: new Date(),
      });

      const userId = await ctx.service.user.selectUserId();
      const userToken = await ctx.service.user.userGithubToken({ id: userId });
      assert(userId === user.id);
      assert(userToken === token);

      const cacheUserId = await ctx.service.user.selectUserId();
      const cacheUserToken = await ctx.service.user.userGithubToken({ id: userId });
      assert(cacheUserId === user.id);
      assert(cacheUserToken === token);
    });
  });

});
