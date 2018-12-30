'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/service/category.test.js', () => {

  describe('GET /category/top', () => {
    it('should work', async () => {
      await app.factory.createMany('category', 3);
      const res = await app.httpRequest().get('/category/top');
      assert(res.status === 200);
      assert(res.body.length === 3);
      assert(res.body[0].id);
      assert(res.body[0].title);
      assert(res.body[0].slug);
    });
  });

});
