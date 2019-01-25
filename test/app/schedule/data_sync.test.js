'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/data_sync.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    const result = await app.runSchedule('data_sync');
    assert(result);
  });

});
