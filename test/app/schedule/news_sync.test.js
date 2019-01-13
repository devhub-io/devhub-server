'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/news_sync.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/topstories.json', {
      data: [ 1 ],
    });
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/newstories.json', {
      data: [ 2 ],
    });
    const base = 'https://hacker-news.firebaseio.com';
    app.mockHttpclient(`${base}/v0/item/1.json'`, {
      data: {
        by: 'pg', descendants: 15, id: 1,
        kids: [ 15, 234509, 487171, 454410, 82729 ], score: 57,
        time: 1160418111, title: 'Y Combinator', type: 'story', url: 'https://github.com/sysatom/goexercise',
      },
    });
    app.mockHttpclient(`${base}/v0/item/2.json'`, {
      data: {
        by: 'pg', descendants: 15, id: 2,
        kids: [ 15, 234509, 487171, 454410, 82729 ], score: 57,
        time: 1160418111, title: 'Y Combinator', type: 'story', url: 'https://github.com/sysatom/goexercise',
      },
    });
    const result = await app.runSchedule('news_sync');
    assert(result);
    const result2 = await app.runSchedule('news_sync');
    assert(result2);
  });

});
