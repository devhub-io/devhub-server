'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/queue.test.js', () => {

  describe('addJob', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const res = await ctx.service.queue.addJob({
        queue: 'reposFetch',
        payload: {
          url: 'https://github.com/eggjs/egg',
        },
      });
      assert(res);
    });
  });

});
