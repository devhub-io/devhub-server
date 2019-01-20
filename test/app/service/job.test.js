'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/job.test.js', () => {

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

  describe('News Fetch', () => {
    it('should work', async () => {
      await app.factory.create('repos', {
        title: 'repos_2',
        category_id: 0,
        slug: 'sysatom-goexercise',
        readme: 'readme',
        description: 'desc',
        language: 'js',
        homepage: '1',
        github: 'https://github.com/sysatom/goexercise',
        stargazers_count: 1,
        watchers_count: 1,
        open_issues_count: 1,
        forks_count: 1,
        subscribers_count: 1,
        issue_response: 1,
        status: 1,
        repos_created_at: new Date(),
        repos_updated_at: new Date(),
        fetched_at: new Date(),
        analytics_at: new Date(),
        user_id: 0,
        is_recommend: 1,
        trends: '0,15,50,63,0,35,0,53',
        owner: 'sysatom',
        repo: 'goexercise',
        cover: 'demo',
        document_url: '',
      });
      const base = 'https://hacker-news.firebaseio.com';
      app.mockHttpclient(`${base}/v0/item/1.json'`, {
        data: {
          by: 'test', descendants: 15, id: 1,
          kids: [ 15, 234509, 487171, 454410, 82729 ], score: 5712,
          time: (new Date()).getTime() / 1000,
          title: 'Y1 Combinator', type: 'story', url: 'https://github.com/sysatom/goexercise',
        },
      });
      app.mockHttpclient(`${base}/v0/item/2.json'`, {
        data: {
          by: 'test', descendants: 15, id: 2,
          kids: [ 15, 234509, 487171, 454410, 82729 ], score: 56113,
          time: (new Date()).getTime() / 1000,
          title: 'Y2 Combinator', type: 'story', url: 'https://github.com/sysatom/EpisodeHub',
        },
      });
      const ctx = app.mockContext({});
      await ctx.service.job.newsFetch({ item_id: 1 });
      await ctx.service.job.newsFetch({ item_id: 2 });
      const resNews = await app.httpRequest().get('/news');
      assert(resNews.status === 200);
      assert(resNews.body.count === 2);
      assert(resNews.body.rows.length === 2);
    });
  });

});
