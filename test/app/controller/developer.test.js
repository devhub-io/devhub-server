'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/service/developer.test.js', () => {

  describe('GET /developer/list', () => {
    it('should work', async () => {
      await app.factory.createMany('developer', 3);
      const res = await app.httpRequest().get('/developer/list?limit=2&page=2&type=Organization');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].login);
      assert(res.body.rows[0].avatar_url);
      assert(res.body.rows[0].type);
    });
  });

});
