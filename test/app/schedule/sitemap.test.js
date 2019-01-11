'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/sitemap.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    const status = await app.runSchedule('sitemap');
    assert(status);
  });

});
