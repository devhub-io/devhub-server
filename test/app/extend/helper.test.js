'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/extend/helper.test.js', () => {

  describe('remember', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const key = 'helper_test';
      const first = await ctx.helper.remember(key, 3600, () => { return 123; });
      assert(first === 123);
      const second = await ctx.helper.remember(key, 3600, () => { return 456; });
      assert(second === 123);
    });
  });

});
