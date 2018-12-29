'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/service/repos.test.js', () => {
  describe('GET /repos', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 repos 对象到数据库中
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].title);
      assert(res.body[0].readme);
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
