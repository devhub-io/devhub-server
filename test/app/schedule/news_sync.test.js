'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/news_sync.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    // Data
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/topstories.json', {
      data: [ 1 ],
    });
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/newstories.json', {
      data: [ 2 ],
    });
    // Test
    const result = await app.runSchedule('news_sync');
    assert(result === 2);
    const result2 = await app.runSchedule('news_sync');
    assert(result2 === 2);
  });

});
