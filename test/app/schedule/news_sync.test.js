'use strict';

const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/schedule/news_sync.test.js', () => {

  it('should schedule work fine', async () => {
    const app = mm.app();
    await app.ready();
    // Data
    await app.factory.create('repos', {
      title: 'repos_2',
      category_id: 0,
      slug: 'sysatom-goexercise',
      readme: 'readme',
      description: 'desc',
      language: 'js',
      homepage: '1',
      github: 'https://github.com/sysatom/goexercise',
      stargazers_count: 1,
      watchers_count: 1,
      open_issues_count: 1,
      forks_count: 1,
      subscribers_count: 1,
      issue_response: 1,
      status: 1,
      repos_created_at: new Date(),
      repos_updated_at: new Date(),
      fetched_at: new Date(),
      analytics_at: new Date(),
      user_id: 0,
      is_recommend: 1,
      trends: '0,15,50,63,0,35,0,53',
      owner: 'sysatom',
      repo: 'goexercise',
      cover: 'demo',
      document_url: '',
    });
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/topstories.json', {
      data: [ 1 ],
    });
    app.mockHttpclient('https://hacker-news.firebaseio.com/v0/newstories.json', {
      data: [ 2 ],
    });
    const base = 'https://hacker-news.firebaseio.com';
    app.mockHttpclient(`${base}/v0/item/1.json'`, {
      data: {
        by: 'test', descendants: 15, id: 1,
        kids: [ 15, 234509, 487171, 454410, 82729 ], score: 5712,
        time: (new Date()).getTime() / 1000,
        title: 'Y1 Combinator', type: 'story', url: 'https://github.com/sysatom/goexercise',
      },
    });
    app.mockHttpclient(`${base}/v0/item/2.json'`, {
      data: {
        by: 'test', descendants: 15, id: 2,
        kids: [ 15, 234509, 487171, 454410, 82729 ], score: 56113,
        time: (new Date()).getTime() / 1000,
        title: 'Y2 Combinator', type: 'story', url: 'https://github.com/sysatom/EpisodeHub',
      },
    });
    // Test
    const result = await app.runSchedule('news_sync');
    assert(result === 2);
    const result2 = await app.runSchedule('news_sync');
    assert(result2 === 2);
    const resNews = await app.httpRequest().get('/news');
    assert(resNews.status === 200);
    assert(resNews.body.count === 2);
    assert(resNews.body.rows.length === 2);
  });

});
