'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/news_sync.test.js', () => {

  it.skip('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    await app.runSchedule('news_sync');
    assert(app.cache);
  });

});
