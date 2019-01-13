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

  describe('ip', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const ip = await ctx.helper.ip();
      assert(ip === '127.0.0.1');
    });
  });

  describe('toInt', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.toInt(1);
      assert(n1 === 1);
      const n2 = ctx.helper.toInt(null);
      assert(n2 === null);
      const n3 = ctx.helper.toInt('10');
      assert(n3 === 10);
    });
  });

});
