'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/service/repos.test.js', () => {
  describe('GET /repos/hottest', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 repos 对象到数据库中
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
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
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
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
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
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

  describe('GET /repos/collections', () => {
    it('should work', async () => {
      await app.factory.createMany('collection', 3);
      const res = await app.httpRequest().get('/repos/collections?limit=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].image);
    });
  });

  describe('GET /topics', () => {
    it('should work', async () => {
      await app.factory.createMany('repos_topic', 3);
      const res = await app.httpRequest().get('/topics');
      assert(res.status === 200);
      assert(res.body.length === 1);
      assert(res.body[0].number);
      assert(res.body[0].topic);
    });
  });

  describe('GET /topics/:topic', () => {
    it('should work', async () => {
      const repos = await app.factory.createMany('repos', 3);
      const id = [];
      repos.forEach(i => {
        id.push(i.id);
        return true;
      });
      for (let i = 0; i < id.length; i++) {
        await app.factory.create('repos_topic', { repos_id: id[i], topic: 'a' });
      }
      await app.factory.createMany('topic_explain', 1);
      const res = await app.httpRequest().get('/topic/a?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].topic.name);
      assert(res.body.explain.text);
    });
  });

});
