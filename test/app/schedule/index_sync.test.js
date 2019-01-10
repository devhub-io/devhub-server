'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/index_sync.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    await app.factory.createMany('repos', 3);
    const status = await app.runSchedule('index_sync');
    assert(status);
  });

});
