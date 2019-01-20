'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/queue.test.js', () => {

  describe('Queue', () => {
    it('add job should work', async () => {
      const result = await app.queue.add({ job: 'echo', data: { text: 'hi' } });
      assert(result);
    });
  });

  describe('processJob', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const result = await ctx.service.queue.processJob({ job: 'echo', data: { text: 'hi' } });
      assert(result === 'hi');
    });
  });

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

  describe('failJob', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const queueJob = await app.factory.create('queue_job');
      const res = await ctx.service.queue.failJob(queueJob.id);
      assert(res);
    });
  });

  describe('finishJob', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const queueJob = await app.factory.create('queue_job');
      const res = await ctx.service.queue.finishJob(queueJob.id);
      assert(res);
    });
  });

  describe('replayJob', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const queueJob = await app.factory.create('queue_job');
      const res = await ctx.service.queue.replayJob(queueJob.id);
      assert(res);
    });
  });

});
