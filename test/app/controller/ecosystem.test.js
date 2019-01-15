'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/ecosystem.test.js', () => {

  describe('GET /ecosystems', () => {
    it('should work', async () => {
      await app.factory.createMany('topic', 3);
      const res = await app.httpRequest().get('/ecosystems?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].homepage);
      assert(res.body.rows[0].github);
      assert(res.body.rows[0].wiki);
    });
  });

});
