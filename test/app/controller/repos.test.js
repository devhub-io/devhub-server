'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/service/repos.test.js', () => {
  describe('GET /repos/hottest', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 repos 对象到数据库中
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/newest', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/trend', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/recommend', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
    });
  });

  describe('GET /count', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      await app.factory.createMany('developer', 2);
      const res = await app.httpRequest().get('/count');
      assert(res.status === 200);
      assert(res.body.repos === 3);
      assert(res.body.developers === 2);
    });
  });

  describe('GET /repos/:id', () => {
    it('should work', async () => {
      const repos = await app.factory.create('repos');
      const res = await app.httpRequest().get(`/repos/${repos.id}`);
      assert(res.status === 200);
      assert(res.body.title === repos.title);
    });
  });

  describe('POST /repos', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/repos')
        .send({
          title: 'title',
          readme: 'readme',
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/repos/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.title === 'title');
    });
  });

  describe('DELETE /repos/:id', () => {
    it('should work', async () => {
      const repos = await app.factory.create('repos');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/repos/${repos.id}`);
      assert(res.status === 200);
    });
  });
});
