'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/ecosystem.test.js', () => {

  describe('GET /ecosystems', () => {
    it('should work', async () => {
      await app.factory.createMany('topic', 3);
      const res = await app.httpRequest().get('/ecosystems?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].homepage);
      assert(res.body.rows[0].github);
      assert(res.body.rows[0].wiki);
    });
  });

  describe('GET /ecosystem/:slug', () => {
    it('should work', async () => {
      const topic = await app.factory.create('topic');
      await app.factory.create('wiki',
        {
          title: 'Node.js',
          slug: 'nodejs',
          summary: 'Node.js is an open-source, cross-platform JavaScript run-time environment.',
          source: 'wikipedia',
          url: topic.wiki,
        });
      for (let i = 0; i < 2; i++) {
        await app.factory.create('collection',
          {
            topic_id: topic.id,
            parent_id: i,
            title: `collection_${i}`,
            slug: `${topic.id}_${i}`,
            sort: i,
            status: 1,
          });
      }

      const res = await app.httpRequest().get(`/ecosystem/${topic.slug}`);
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 3);
      assert(res.body.topic.slug === topic.slug);
      assert(res.body.topic.title);
      assert(res.body.topic.description);
      assert(res.body.topic.github);
      assert(res.body.topic.homepage);

      assert(res.body.wiki.title);
      assert(res.body.wiki.summary);
      assert(res.body.wiki.url);

      assert(res.body.collections.length === 1);
      assert(res.body.collections[0].title);
      assert(res.body.collections[0].slug);

      const res404 = await app.httpRequest().get('/ecosystem/notfound');
      assert(res404.status === 404);
    });
  });

  describe('GET /ecosystem/:slug/outline', () => {
    it('should work', async () => {
      const topic = await app.factory.create('topic');
      for (let i = 0; i < 3; i++) {
        await app.factory.create('collection',
          {
            topic_id: topic.id,
            parent_id: i,
            title: `collection_${i}`,
            slug: `${topic.id}_${i}`,
            sort: i,
            status: 1,
          });
      }

      const res = await app.httpRequest().get(`/ecosystem/${topic.slug}/outline`);
      assert(res.status === 200);
      assert(res.body.length === 1);
      assert(res.body[0].title);
      assert(res.body[0].slug);
      assert(res.body[0].children);
      assert(res.body[0].children[0].children[0].title);

      const res404 = await app.httpRequest().get('/ecosystem/notfound/outline');
      assert(res404.status === 404);
    });
  });

  describe('GET /ecosystem/:slug/items', () => {
    it.skip('should work', async () => {
      const topic = await app.factory.create('topic');
      const collection = await app.factory.create('collection',
        {
          topic_id: topic.id,
          parent_id: 0,
          title: 'collection',
          slug: 'collection',
          sort: 0,
          status: 1,
        });
      for (let i = 0; i < 3; i++) {
        await app.factory.create('collection_item',
          {
            collection_id: collection.id,
            title: `collection_${i}`,
            type: 'text',
            sort: i,
            status: 1,
          });
      }

      const res = await app.httpRequest().get(`/ecosystem/${collection.slug}/items`);
      assert(res.status === 200);
      assert(res.body.length === 3);
      assert(res.body[0].title);
      assert(res.body[0].type);

      const res404 = await app.httpRequest().get('/ecosystem/notfound/items');
      assert(res404.status === 404);
    });
  });

});
