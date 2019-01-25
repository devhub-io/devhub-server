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


  describe('Cache', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const res = await ctx.helper.setCache('test', 120, 'hi');
      assert(res);
      const get = await ctx.helper.getCache('test');
      assert(get === 'hi');
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

  describe('randomString', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.randomString(10);
      assert(n1.length === 10);
      const n2 = ctx.helper.randomString(10);
      assert(n2 !== n1);
      const n3 = ctx.helper.randomString(5);
      assert(n3.length === 5);
    });
  });

  describe('toSlug', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.toSlug('Node.js');
      assert(n1 === 'nodejs');
      const n2 = ctx.helper.toSlug('Node js');
      assert(n2 === 'node-js');
      const n3 = ctx.helper.toSlug(1);
      assert(n3 === 1);
    });
  });

  describe('isGithubRepos', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.isGithubRepos('https://github.com/bcoe/nyc');
      assert(n1);
      assert(n1[1]);
      assert(n1[2]);
      const n2 = ctx.helper.isGithubRepos('https://github.com/bcoe');
      assert(n2 === null);
    });
  });

  describe('isGithubRepos', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.isGithubDeveloper('https://github.com/bcoe/nyc');
      assert(n1 === null);
      const n2 = ctx.helper.isGithubDeveloper('https://github.com/bcoe');
      assert(n2);
      assert(n2[1]);
    });
  });

  describe('isSite', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.isSite('https://github.com/bcoe/nyc');
      assert(n1 === null);
      const n2 = ctx.helper.isSite('https://github.com/bcoe');
      assert(n2 === null);
      const n3 = ctx.helper.isSite('https://github.com/');
      assert(n3);
      const n4 = ctx.helper.isSite('https://github.com');
      assert(n4);
      const n5 = ctx.helper.isSite('https://www.github.com');
      assert(n5);
    });
  });

  describe('isSite', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.isUrl('https://github.com/bcoe/nyc');
      assert(n1);
      const n2 = ctx.helper.isUrl('https://github.com/bcoe');
      assert(n2);
      const n3 = ctx.helper.isUrl('https://github.com/');
      assert(n3);
      const n4 = ctx.helper.isUrl('https://github.com');
      assert(n4);
      const n5 = ctx.helper.isUrl('https://www.github.com');
      assert(n5);
      const n6 = ctx.helper.isUrl('www.github.com');
      assert(n6 === null);
      const n7 = ctx.helper.isUrl('www.github.com/demo.html');
      assert(n7 === null);
    });
  });

  describe('parseMsg', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      const n1 = ctx.helper.parseMsg('message');
      assert(n1.meta.timestamp);
      assert(n1.data.action === 'message');
      assert(n1.data.payload);
      const n2 = ctx.helper.parseMsg('demo', { url: 'http://demo.url' }, { status: 200 });
      assert(n2.meta.timestamp);
      assert(n2.meta.status === 200);
      assert(n2.data.action === 'demo');
      assert(n2.data.payload.url === 'http://demo.url');
    });
  });

});
