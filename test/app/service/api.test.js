'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const env = require('../../../.env');

describe('test/app/service/api.test.js', () => {

  describe('librariesioReposSearch', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const query = { keywords: '', page: 1, limit: 10 };
      app.mockHttpclient(`https://libraries.io/api/search?q=${query.keywords}&page=${query.page}&per_page=${query.limit}&api_key=${env.LIBRARIESIO_KEY}`, {
        data: [{
          name: 'egg',
          platform: 'NPM',
          description: 'A web framework\'s framework for Node.js',
          homepage: 'https://github.com/eggjs/egg',
          repository_url: 'https://github.com/eggjs/egg',
          normalized_licenses: [ 'MIT' ],
          rank: 23,
          latest_release_published_at: '2018-12-20T03:18:45.918Z',
          latest_release_number: '2.14.2',
          language: 'JavaScript',
          status: null,
          package_manager_url: 'https://www.npmjs.com/package/egg',
          stars: 11166,
          forks: 1122,
          keywords: [ 'framework', 'koa', 'egg', 'eggjs', 'enterprise', 'koa-middleware', 'koa2', 'node-framework', 'nodejs' ],
          latest_stable_release: {
            id: 17187026,
            project_id: 279056,
            number: '2.14.2',
            published_at: '2018-12-20T03:18:45.918Z',
            created_at: '2018-12-20T03:19:00.071Z',
            updated_at: '2018-12-20T03:19:00.071Z',
            runtime_dependencies_count: 41,
          },
          latest_download_url: 'https://registry.npmjs.org/egg/-/egg-2.14.2.tgz',
          dependents_count: 788,
          dependent_repos_count: 1088,
          latest_stable_release_number: '2.14.2',
          latest_stable_release_published_at: '2018-12-20T03:18:45.918Z',
          versions: [
            { number: '2.7.1', published_at: '2018-04-17T03:58:42.943Z' },
            { number: '2.8.0', published_at: '2018-05-03T04:01:25.740Z' },
            { number: '2.8.1', published_at: '2018-05-05T09:22:23.194Z' },
            { number: '2.9.0', published_at: '2018-06-07T08:51:36.286Z' },
            { number: '2.9.1', published_at: '2018-06-20T08:23:27.867Z' }],
        }],
      });
      const res = await ctx.service.api.librariesioReposSearch(query);
      assert(res.length === 1);
    });
  });

  describe('smmsImageUpload', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      app.mockHttpclient('https://sm.ms/api/upload', {
        data: {
          code: 'success',
          data:
            { width: 164,
              height: 162,
              filename: 'demo.png',
              storename: '5c4342a4dc1a3.png',
              size: 4524,
              path: '/2019/01/19/5c4342a4dc1a3.png',
              hash: 'EvKYq7uy4xwrdSZ',
              timestamp: 1547911844,
              ip: '117.136.41.59',
              url: 'https://i.loli.net/2019/01/19/5c4342a4dc1a3.png',
              delete: 'https://sm.ms/delete/EvKYq7uy4xwrdSZ',
            },
        },
      });
      const res = await ctx.service.api.smmsImageUpload(__filename);
      assert(res);
    });
  });

  describe('bearychatSendMessage', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      app.mockHttpclient(env.BEARYCHAT_WEBHOOK, {
        data: { code: 0, result: null },
      });
      const res = await ctx.service.api.bearychatSendMessage('hi');
      assert(res);
    });
  });

});
