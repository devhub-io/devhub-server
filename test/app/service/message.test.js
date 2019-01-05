'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/message.test.js', () => {

  describe('Send', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const res = await ctx.service.message.send('hi');
      assert(res.code === 0);
    });
  });

});
