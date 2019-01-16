'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/job.test.js', () => {

  describe('Queue', () => {
    it('add job should work', async () => {
      const result = await app.queue.add({ job: 'echo', data: { text: 'hi' } });
      assert(result);
    });
  });

  describe('Process', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const result = await ctx.service.job.process({ job: 'echo', data: { text: 'hi' } });
      assert(result === 'hi');
    });
  });

  describe('Token', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const nullUserId = await ctx.service.job.selectUserId();
      const nullUserToken = await ctx.service.job.userGithubToken({ id: 3 });
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

      const userId = await ctx.service.job.selectUserId();
      const userToken = await ctx.service.job.userGithubToken({ id: userId });
      assert(userId === user.id);
      assert(userToken === token);

      const cacheUserId = await ctx.service.job.selectUserId();
      const cacheUserToken = await ctx.service.job.userGithubToken({ id: userId });
      assert(cacheUserId === user.id);
      assert(cacheUserToken === token);
    });
  });

  describe('No User', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const falseReposStatus = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(falseReposStatus === false);
      const falseDeveloperStatus = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(falseDeveloperStatus === false);
    });
  });

  describe('Repos Fetch', () => {
    it.skip('should work', async () => {
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

      const ctx = app.mockContext({});
      const status = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(status === true);
      const falseStatus = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(falseStatus === false);
    });
  });

  describe('Developer Fetch', () => {
    it.skip('should work', async () => {
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

      const ctx = app.mockContext({});
      const status = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(status === true);
      const falseStatus = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(falseStatus === false);
    });
  });

});
