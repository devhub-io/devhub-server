'use strict';

const jwt = require('jsonwebtoken');
const queryString = require('querystring');
const { app, assert } = require('egg-mock/bootstrap');
const env = require('../../../.env');

describe('test/app/controller/admin.test.js', () => {

  it('should GET /admin', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const res = await app.httpRequest()
      .get('/admin')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const user2 = await app.factory.create('user');
    const token2 = jwt.sign({ sub: user2.id }, env.JWT_SECRET);
    return app.httpRequest()
      .get('/admin')
      .set({ Authorization: `bearer ${token2}` })
      .expect(401);
  });

  it('should GET /admin/users', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const users = await app.factory.createMany('user', 2);
    const res = await app.httpRequest()
      .get('/admin/users?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].name);
    assert(res.body.rows[0].email);

    const resSearch = await app.httpRequest()
      .get(`/admin/users?limit=1&sort_type=updated_at&name=${users[0].name}&email=${users[0].email}&status=${users[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === users[0].id);
    assert(resSearch.body.rows[0].name === users[0].name);
    assert(resSearch.body.rows[0].email === users[0].email);
  });

  it('should GET /admin/queue_jobs', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const jobs = await app.factory.createMany('queue_job', 3);
    const res = await app.httpRequest()
      .get('/admin/queue_jobs?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].queue);

    const resSearch = await app.httpRequest()
      .get(`/admin/queue_jobs?limit=1&sort_type=updated_at&queue=${jobs[0].queue}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === jobs[0].id);
    assert(resSearch.body.rows[0].queue === jobs[0].queue);
  });

  it('should GET /admin/sites', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const sites = await app.factory.createMany('site', 3);
    const res = await app.httpRequest()
      .get('/admin/sites?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].url);

    const resSearch = await app.httpRequest()
      .get(`/admin/sites?limit=1&sort_type=updated_at&title=${sites[0].title}&url=${sites[0].url}&status=${sites[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === sites[0].id);
    assert(resSearch.body.rows[0].title === sites[0].title);
    assert(resSearch.body.rows[0].url === sites[0].url);
  });

  it('should GET /admin/links', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const links = await app.factory.createMany('link', 3);
    const res = await app.httpRequest()
      .get('/admin/links?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].url);

    const resSearch = await app.httpRequest()
      .get(`/admin/links?limit=1&sort_type=updated_at&title=${links[0].title}&url=${links[0].url}&status=${links[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === links[0].id);
    assert(resSearch.body.rows[0].title === links[0].title);
    assert(resSearch.body.rows[0].url === links[0].url);
  });

  it('should GET /admin/wiki', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const wiki = await app.factory.createMany('wiki', 3);
    const res = await app.httpRequest()
      .get('/admin/wiki?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].url);

    const resSearch = await app.httpRequest()
      .get(`/admin/wiki?limit=1&sort_type=updated_at&title=${wiki[0].title}&url=${wiki[0].url}&status=${wiki[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === wiki[0].id);
    assert(resSearch.body.rows[0].title === wiki[0].title);
    assert(resSearch.body.rows[0].url === wiki[0].url);
  });

  it('should GET /admin/news', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const news = await app.factory.createMany('repos_news', 3);
    const res = await app.httpRequest()
      .get('/admin/news?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].post_date);

    const resSearch = await app.httpRequest()
      .get(`/admin/news?limit=1&sort_type=updated_at&title=${news[0].title}&post_date=${news[0].post_date}&status=${news[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === news[0].id);
    assert(resSearch.body.rows[0].title === news[0].title);
    assert(resSearch.body.rows[0].post_date === news[0].post_date);
  });

  it('should GET /admin/articles', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const articles = await app.factory.createMany('article', 3);
    const res = await app.httpRequest()
      .get('/admin/articles?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].url);

    const resSearch = await app.httpRequest()
      .get(`/admin/articles?limit=1&sort_type=updated_at&title=${articles[0].title}&url=${articles[0].url}&status=${articles[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === articles[0].id);
    assert(resSearch.body.rows[0].title === articles[0].title);
    assert(resSearch.body.rows[0].url === articles[0].url);
  });

  it('should GET /admin/click', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const click = await app.factory.createMany('link_click', 3);
    const res = await app.httpRequest()
      .get('/admin/click?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].target);
    assert(res.body.rows[0].referer);

    const resSearch = await app.httpRequest()
      .get(`/admin/click?limit=1&sort_type=clicked_at&target=${click[0].target}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === click[0].id);
    assert(resSearch.body.rows[0].target === click[0].target);
    assert(resSearch.body.rows[0].referer === click[0].referer);
  });

  it('should GET /admin/vote', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const vote = await app.factory.createMany('repos_vote', 3);
    const res = await app.httpRequest()
      .get('/admin/vote?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].repos_id);
    assert(res.body.rows[0].reliable);
    assert(res.body.rows[0].recommendation);
    assert(res.body.rows[0].documentation);

    const resSearch = await app.httpRequest()
      .get(`/admin/vote?limit=1&sort_type=updated_at&repos_id=${vote[0].repos_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].repos_id === vote[0].repos_id);
    assert(resSearch.body.rows[0].reliable === vote[0].reliable);
    assert(resSearch.body.rows[0].recommendation === vote[0].recommendation);
    assert(resSearch.body.rows[0].documentation === vote[0].documentation);
  });

  it('should GET /admin/repos', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const repos = await app.factory.createMany('repos', 3);
    const res = await app.httpRequest()
      .get('/admin/repos?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].title);
    assert(res.body.rows[0].slug);

    const resSearch = await app.httpRequest()
      .get(`/admin/repos?limit=1&sort_type=stargazers_count&slug=${repos[0].slug}&status=${repos[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === repos[0].id);
    assert(resSearch.body.rows[0].title === repos[0].title);
    assert(resSearch.body.rows[0].slug === repos[0].slug);
  });

  it('should POST /admin/repos/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const repos = await app.factory.create('repos');
    const res = await app.httpRequest()
      .post('/admin/repos/switch')
      .send({ id: [ repos.id ], status: 0 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/repos/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const repos = await app.factory.create('repos');
    const res = await app.httpRequest()
      .post('/admin/repos/edit')
      .send({ id: repos.id, status: 2 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/repos/enable', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    await app.factory.create('repos');
    const res = await app.httpRequest()
      .post('/admin/repos/enable')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should GET /admin/developers', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const developers = await app.factory.createMany('developer', 3);
    const res = await app.httpRequest()
      .get('/admin/developers?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].login);
    assert(res.body.rows[0].type);

    const resSearch = await app.httpRequest()
      .get(`/admin/developers?limit=1&sort_type=view_number&login=${developers[0].login}&status=${developers[0].status}&type=${developers[0].type}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === developers[0].id);
    assert(resSearch.body.rows[0].login === developers[0].login);
    assert(resSearch.body.rows[0].type === developers[0].type);
  });

  it('should POST /admin/developer/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const developer = await app.factory.create('developer');
    const res = await app.httpRequest()
      .post('/admin/developer/switch')
      .send({ id: [ developer.id ], status: 0 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/developer/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const developer = await app.factory.create('developer');
    const res = await app.httpRequest()
      .post('/admin/developer/edit')
      .send({ id: developer.id, status: 2 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/developer/enable', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    await app.factory.create('developer');
    const res = await app.httpRequest()
      .post('/admin/developer/enable')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should GET /admin/ecosystems', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topics = await app.factory.createMany('topic', 3);
    const res = await app.httpRequest()
      .get('/admin/ecosystems?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].slug);
    assert(res.body.rows[0].title);

    const resSearch = await app.httpRequest()
      .get(`/admin/ecosystems?limit=1&sort_type=sort&slug=${topics[0].slug}&status=${topics[0].status}}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === topics[0].id);
    assert(resSearch.body.rows[0].title === topics[0].title);
    assert(resSearch.body.rows[0].slug === topics[0].slug);
  });

  it('should POST /admin/ecosystem/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/switch')
      .send({ id: [ topic.id ], status: 0 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/ecosystem/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/edit')
      .send({ id: topic.id, status: 2, title: 'edit' })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/ecosystem/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const res = await app.httpRequest()
      .post('/admin/ecosystem/create')
      .send({
        title: 'demo',
        slug: 'demo',
        description: 'demo',
        homepage: 'demo',
        github: 'demo',
        wiki: 'demo',
        sort: 1,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.title === 'demo');
    assert(res.body.slug === 'demo');
    assert(res.body.description === 'demo');
    assert(res.body.homepage === 'demo');
    assert(res.body.github === 'demo');
    assert(res.body.wiki === 'demo');
    assert(res.body.sort === 1);
  });

  it('should GET /admin/ecosystem/collections', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const collection = await app.factory.create('collection', {
      topic_id: topic.id,
      parent_id: 0,
      title: 'collection_1',
      slug: 'c_1',
      sort: 1,
      status: 1,
    });
    const childCollection = await app.factory.create('collection', {
      topic_id: topic.id,
      parent_id: collection.id,
      title: 'collection_1',
      slug: 'c_2',
      sort: 1,
      status: 1,
    });
    const res = await app.httpRequest()
      .get(`/admin/ecosystem/collections?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === collection.id);
    assert(res.body[0].slug === collection.slug);
    assert(res.body[0].children[0].id === childCollection.id);
  });

  it('should POST /admin/ecosystem/collection/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const collection = await app.httpRequest()
      .post('/admin/ecosystem/collection/create')
      .send({
        topic_id: topic.id,
        title: 'demo',
        slug: 'demo',
        parent_id: 0,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });

    const res = await app.httpRequest()
      .get(`/admin/ecosystem/collections?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === collection.body.id);
    assert(res.body[0].slug === collection.body.slug);
  });

  it('should POST /admin/ecosystem/collection/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection = await app.factory.create('collection');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/edit')
      .send({
        id: collection.id,
        title: 'edit',
        slug: 'edit',
        parent_id: 0,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });

    assert(res.status === 200);
    assert(res.body.affected.id === collection.id);
    assert(res.body.affected.title === 'edit');
    assert(res.body.affected.slug === 'edit');
  });

  it('should POST /admin/ecosystem/collection/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic_id = 1;
    const collection = await app.factory.create('collection', {
      topic_id,
      parent_id: 0,
      title: 'collection_1',
      slug: 'c_1',
      sort: 1,
      status: 1,
    });
    const resStart = await app.httpRequest()
      .get(`/admin/ecosystem/collections?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.length === 1);

    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/delete')
      .send({
        id: collection.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get(`/admin/ecosystem/collections?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 200);
    assert(resEnd.body.length === 0);
  });

  it('should GET /admin/ecosystem/collection/items', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection = await app.factory.create('collection');
    await app.factory.create('collection_item', {
      collection_id: collection.id,
      title: 'item_1',
      type: 'text',
      sort: 2,
      status: 1,
    });
    const repos = await app.factory.create('repos');
    const item = await app.factory.create('collection_item', {
      collection_id: collection.id,
      title: repos.title,
      type: 'repos',
      foreign_id: repos.id,
      sort: 1,
      status: 1,
    });
    const res = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collection.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 2);
    assert(res.body[0].id === item.id);
    assert(res.body[0].title === item.title);
    assert(res.body[0].type === item.type);
  });

  it('should POST /admin/ecosystem/collection/item/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection = await app.factory.create('collection');
    // repos type
    const repos = await app.factory.create('repos');
    const reposTypeRes = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/create')
      .send({
        collection_id: collection.id,
        title: 'demo',
        type: 'repos',
        foreign_id: repos.id,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(reposTypeRes.status === 200);
    assert(reposTypeRes.body.type === 'repos');
    assert(reposTypeRes.body.foreign_id === repos.id);
    assert(reposTypeRes.body.title === `${repos.owner}/${repos.repo}`);

    // developer type
    const developer = await app.factory.create('developer');
    const developerTypeRes = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/create')
      .send({
        collection_id: collection.id,
        title: 'demo',
        type: 'developers',
        foreign_id: developer.id,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(developerTypeRes.status === 200);
    assert(developerTypeRes.body.type === 'developers');
    assert(developerTypeRes.body.foreign_id === developer.id);
    assert(developerTypeRes.body.title === `${developer.login} (${developer.name})`);

    // site type
    const site = await app.factory.create('site');
    const siteTypeRes = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/create')
      .send({
        collection_id: collection.id,
        title: 'demo',
        type: 'sites',
        foreign_id: site.id,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(siteTypeRes.status === 200);
    assert(siteTypeRes.body.type === 'sites');
    assert(siteTypeRes.body.foreign_id === site.id);
    assert(siteTypeRes.body.title === site.title);

    // link type
    const link = await app.factory.create('link');
    const linkTypeRes = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/create')
      .send({
        collection_id: collection.id,
        title: 'demo',
        type: 'links',
        url: link.url,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(linkTypeRes.status === 200);
    assert(linkTypeRes.body.type === 'links');
    assert(linkTypeRes.body.foreign_id === link.id);
    assert(linkTypeRes.body.title === link.title);
    const newlinkTypeRes = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/create')
      .send({
        collection_id: collection.id,
        title: 'demo',
        type: 'links',
        url: 'http://oth.er',
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(newlinkTypeRes.status === 200);
    assert(newlinkTypeRes.body.foreign_id);

    const res = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collection.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 5);
  });

  it('should POST /admin/ecosystem/collection/item/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const item = await app.factory.create('collection_item');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/edit')
      .send({
        id: item.id,
        title: 'edit',
        status: 2,
        sort: 0,
      })
      .set({ Authorization: `bearer ${token}` });

    assert(res.status === 200);
    assert(res.body.affected.id === item.id);
    assert(res.body.affected.title === 'edit');
    assert(res.body.affected.status === 2);
    assert(res.body.affected.sort === 0);
  });

  it('should POST /admin/ecosystem/collection/item/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection = await app.factory.create('collection');
    const item = await app.factory.create('collection_item', {
      collection_id: collection.id,
      title: 'item_1',
      type: 'text',
      sort: 2,
      status: 1,
    });
    const resStart = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collection.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.length === 1);

    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/delete')
      .send({
        id: item.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collection.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 200);
    assert(resEnd.body.length === 0);
  });

  it('should POST /admin/ecosystem/collection/import', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    await app.factory.create('repos', {
      title: 'webtorrent',
      category_id: 0,
      slug: 'feross-webtorrent',
      readme: 'readme',
      description: 'description',
      language: 'javascript',
      homepage: '',
      github: 'https://github.com/feross/webtorrent',
      stargazers_count: 1,
      watchers_count: 2,
      open_issues_count: 3,
      forks_count: 4,
      subscribers_count: 5,
      issue_response: 6,
      status: 1,
      repos_created_at: new Date(),
      repos_updated_at: new Date(),
      fetched_at: new Date(),
      analytics_at: new Date(),
      user_id: 0,
      is_recommend: 1,
      trends: '0,15,50,63,0,35,0,53',
      owner: 'feross',
      repo: 'webtorrent',
      cover: '',
      document_url: '',
    });
    await app.factory.create('developer', {
      login: 'mafintosh',
      name: 'mafintosh',
      description: 'description',
      github_id: 1,
      avatar_url: '',
      html_url: '',
      type: 'Organization',
      site_admin: 1,
      company: '',
      blog: '',
      location: '',
      email: '',
      public_repos: 1,
      public_gists: 2,
      followers: 3,
      following: 4,
      view_number: 0,
      status: 1,
      site_created_at: new Date(),
      site_updated_at: new Date(),
      fetched_at: new Date(),
      analytics_at: new Date(),
      rating: 0,
    });
    await app.factory.create('site', {
      title: 'nodebots',
      category: 0,
      url: 'http://nodebots.io',
      sort: 0,
      status: 1,
      icon: 'icon',
      description: 'description',
      level: 1,
    });
    await app.factory.create('link', {
      title: 'nodebots',
      summary: '',
      source: 'internet',
      url: 'http://stackoverflow.com/questions/tagged/node.js',
      status: 1,
    });

    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/import')
      .send({
        topic_id: topic.id,
        text: '## Demo\n' +
          '\n' +
          '### Mad science\n' +
          '\n' +
          '- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for Node.js and the browser.\n' +
          '- [CASL](https://github.com/stalniy/casl) - Isomorphic authorization for UI and API.\n' +
          '- [mafintosh](https://github.com/mafintosh)\n' +
          '- [Swaagie](https://github.com/Swaagie) - HTML minifier.\n' +
          '\n' +
          '### Community\n' +
          '\n' +
          '- [Gitter](https://gitter.im/nodejs/node)\n' +
          '- [`#node.js` on Freenode](http://webchat.freenode.net/?channels=node.js)\n' +
          '- [Stack Overflow](http://stackoverflow.com/questions/tagged/node.js)\n' +
          '- Module Requests & Ideas\n' +
          '- [nodebots](http://nodebots.io) - Robots powered by JavaScript.\n' +
          '- [Node Weekly](http://nodeweekly.com) - Weekly e-mail round-up of Node.js news and articles.\n' +
          '\n' +
          '## Books\n' +
          '# Articles\n',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const collectionsRes = await app.httpRequest()
      .get(`/admin/ecosystem/collections?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(collectionsRes.status === 200);
    assert(collectionsRes.body.length === 1);

    const items1Res = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collectionsRes.body[0].children[0].id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(items1Res.status === 200);
    assert(items1Res.body.length === 4);
    const items2Res = await app.httpRequest()
      .get(`/admin/ecosystem/collection/items?id=${collectionsRes.body[0].children[1].id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(items2Res.status === 200);
    assert(items2Res.body.length === 6);
  });

  it('should POST /admin/ecosystem/collection/crawler', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    await app.factory.create('repos', {
      title: 'webtorrent',
      category_id: 0,
      slug: 'feross-webtorrent',
      readme: 'readme',
      description: 'description',
      language: 'javascript',
      homepage: '',
      github: 'https://github.com/feross/webtorrent',
      stargazers_count: 1,
      watchers_count: 2,
      open_issues_count: 3,
      forks_count: 4,
      subscribers_count: 5,
      issue_response: 6,
      status: 1,
      repos_created_at: new Date(),
      repos_updated_at: new Date(),
      fetched_at: new Date(),
      analytics_at: new Date(),
      user_id: 0,
      is_recommend: 1,
      trends: '0,15,50,63,0,35,0,53',
      owner: 'feross',
      repo: 'webtorrent',
      cover: '',
      document_url: '',
    });

    app.mockHttpclient('https://raw.githubusercontent.com/bayandin/awesome-awesomeness/master/README.md', {
      data: '## Demo\n' +
        '\n' +
        '### Mad science\n' +
        '\n' +
        '- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for Node.js and the browser.\n' +
        '\n' +
        '### Community\n' +
        '\n' +
        '- [Gitter](https://gitter.im/nodejs/node)\n' +
        '- [`#node.js` on Freenode](http://webchat.freenode.net/?channels=node.js)\n' +
        '- [Stack Overflow](http://stackoverflow.com/questions/tagged/node.js)\n' +
        '- Module Requests & Ideas\n' +
        '- [nodebots](http://nodebots.io) - Robots powered by JavaScript.\n' +
        '- [Node Weekly](http://nodeweekly.com) - Weekly e-mail round-up of Node.js news and articles.\n' +
        '\n' +
        '## Books\n' +
        '# Articles\n',
    });

    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/crawler')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should GET /admin/api/search', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const resDevelopers = await app.httpRequest()
      .get('/admin/api/search?' + queryString.stringify({
        type: 'developers',
        keywords: 'abc',
      }))
      .set({ Authorization: `bearer ${token}` });
    assert(resDevelopers.status === 200);
    const resRepos = await app.httpRequest()
      .get('/admin/api/search?' + queryString.stringify({
        type: 'repos',
        keywords: 'abc',
      }))
      .set({ Authorization: `bearer ${token}` });
    assert(resRepos.status === 200);
    const resEmpty = await app.httpRequest()
      .get('/admin/api/search')
      .set({ Authorization: `bearer ${token}` });
    assert(resEmpty.status === 200);
  });

  it('should POST /admin/queue/replay', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const job = await app.factory.create('queue_job');

    const res = await app.httpRequest()
      .post('/admin/queue/replay')
      .send({
        id: [ job.id ],
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should POST /admin/queue/replay/all', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    await app.factory.create('queue_job');

    const res = await app.httpRequest()
      .post('/admin/queue/replay/all')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should POST /admin/queue/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const job = app.factory.create('queue_job');

    const res = await app.httpRequest()
      .post('/admin/queue/delete')
      .send({
        id: job.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should GET /admin/queue/bull/counts', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const res = await app.httpRequest()
      .get('/admin/queue/bull/counts')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.completed === 0);
    assert(res.body.failed === 0);
    assert(res.body.delayed === 0);
  });

  it('should GET /admin/queue/bull/clean', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const res = await app.httpRequest()
      .post('/admin/queue/bull/clean')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resAll = await app.httpRequest()
      .post('/admin/queue/bull/clean')
      .send({
        type: 'all',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(resAll.status === 200);
  });

  it('should GET /admin/queue/system/clean', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const resFailed = await app.httpRequest()
      .post('/admin/queue/system/clean')
      .send({
        type: 'failed',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(resFailed.status === 200);

    const resRepeat = await app.httpRequest()
      .post('/admin/queue/system/clean')
      .send({
        type: 'repeat',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(resRepeat.status === 200);

    const resOther = await app.httpRequest()
      .post('/admin/queue/system/clean')
      .send({
        type: 'other',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(resOther.status === 200);
  });

  it('should POST /admin/fetch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);

    const res = await app.httpRequest()
      .post('/admin/fetch')
      .send({
        url: 'https://example.com',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should POST /admin/ecosystem/collection/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection1 = await app.factory.create('collection');
    const collection2 = await app.factory.create('collection');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/switch')
      .send({ id: [ collection1.id, collection2.id ], status: 0 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/ecosystem/collection/move', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collection1 = await app.factory.create('collection');
    const collection2 = await app.factory.create('collection');
    const collection3 = await app.factory.create('collection');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/move')
      .send({ id: [ collection2.id, collection3.id ], parent_id: collection1.id })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/ecosystem/collection/item/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const collectionItem1 = await app.factory.create('collection_item');
    const collectionItem2 = await app.factory.create('collection_item');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/switch')
      .send({ id: [ collectionItem1.id, collectionItem2.id ], status: 0 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/ecosystem/collection/item/check', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    await app.factory.create('collection_item');
    await app.factory.create('collection_item');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/collection/item/check')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
  });

  it('should GET /admin/ecosystem/attributes', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const attribute = await app.factory.create('topic_attribute', {
      topic_id: topic.id,
      key: 'hi',
      value: 'demo',
    });
    const res = await app.httpRequest()
      .get(`/admin/ecosystem/attributes?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === attribute.id);
    assert(res.body[0].key === attribute.key);
    assert(res.body[0].value === attribute.value);
  });

  it('should POST /admin/ecosystem/attribute/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const attribute = await app.httpRequest()
      .post('/admin/ecosystem/attribute/create')
      .send({
        topic_id: topic.id,
        key: 'demo',
        value: 'demo',
      })
      .set({ Authorization: `bearer ${token}` });

    const res = await app.httpRequest()
      .get(`/admin/ecosystem/attributes?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === attribute.body.id);
    assert(res.body[0].key === attribute.body.key);
    assert(res.body[0].value === attribute.body.value);
  });

  it('should POST /admin/ecosystem/attribute/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const attribute = await app.factory.create('topic_attribute');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/attribute/edit')
      .send({
        id: attribute.id,
        key: 'edit',
        value: 'edit',
      })
      .set({ Authorization: `bearer ${token}` });

    assert(res.status === 200);
    assert(res.body.affected.id === attribute.id);
    assert(res.body.affected.key === 'edit');
    assert(res.body.affected.value === 'edit');
  });

  it('should POST /admin/ecosystem/attribute/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic_id = 1;
    const attribute = await app.factory.create('topic_attribute', {
      topic_id,
      key: 'topic_1',
      value: 'demo',
    });
    const resStart = await app.httpRequest()
      .get(`/admin/ecosystem/attributes?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.length === 1);

    const res = await app.httpRequest()
      .post('/admin/ecosystem/attribute/delete')
      .send({
        id: attribute.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get(`/admin/ecosystem/attributes?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 200);
    assert(resEnd.body.length === 0);
  });


  it('should GET /admin/ecosystem/source', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const source = await app.factory.create('topic_source', {
      topic_id: topic.id,
      source: 'hi',
      url: 'demo',
    });
    const res = await app.httpRequest()
      .get(`/admin/ecosystem/source?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === source.id);
    assert(res.body[0].source === source.source);
    assert(res.body[0].url === source.url);
  });

  it('should POST /admin/ecosystem/source/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.create('topic');
    const source = await app.httpRequest()
      .post('/admin/ecosystem/source/create')
      .send({
        topic_id: topic.id,
        source: 'demo',
        url: 'demo',
      })
      .set({ Authorization: `bearer ${token}` });

    const res = await app.httpRequest()
      .get(`/admin/ecosystem/source?id=${topic.id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.length === 1);
    assert(res.body[0].id === source.body.id);
    assert(res.body[0].source === source.body.source);
    assert(res.body[0].url === source.body.url);
  });

  it('should POST /admin/ecosystem/source/fetch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic_source = await app.factory.create('topic_source');
    const res = await app.httpRequest()
      .post('/admin/ecosystem/source/fetch')
      .send({
        id: topic_source.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resNot = await app.httpRequest()
      .post('/admin/ecosystem/source/fetch')
      .send({
        id: 999,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(resNot.status === 200);
  });

  it('should POST /admin/ecosystem/source/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic_id = 1;
    const source = await app.factory.create('topic_source', {
      topic_id,
      source: 'source_1',
      url: 'demo',
    });
    const resStart = await app.httpRequest()
      .get(`/admin/ecosystem/source?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.length === 1);

    const res = await app.httpRequest()
      .post('/admin/ecosystem/source/delete')
      .send({
        id: source.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get(`/admin/ecosystem/source?id=${topic_id}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 200);
    assert(resEnd.body.length === 0);
  });

  it('should GET /admin/feedback', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const feedback = await app.factory.createMany('feedback', 3);
    const res = await app.httpRequest()
      .get('/admin/feedback?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
    assert(res.body.rows[0].message);
    assert(res.body.rows[0].email);

    const resSearch = await app.httpRequest()
      .get(`/admin/feedback?limit=1&sort_type=created_at&tags=${feedback[0].tags}&status=${feedback[0].status}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].id === feedback[0].id);
    assert(resSearch.body.rows[0].message === feedback[0].message);
    assert(resSearch.body.rows[0].email === feedback[0].email);
  });

  it('should POST /admin/feedback/switch', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const feedback = await app.factory.create('feedback');
    const res = await app.httpRequest()
      .post('/admin/feedback/switch')
      .send({ id: [ feedback.id ], status: 2 })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.affected);
  });

  it('should POST /admin/feedback/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const feedback = await app.factory.create('feedback');
    const resStart = await app.httpRequest()
      .get('/admin/feedback')
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.count === 1);

    const res = await app.httpRequest()
      .post('/admin/feedback/delete')
      .send({
        id: feedback.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get('/admin/feedback')
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 200);
    assert(resEnd.body.count === 0);
  });

  it('should GET /admin/ecosystem/analytics', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const topic = await app.factory.createMany('topic', 2);
    const resStart = await app.httpRequest()
      .get('/admin/ecosystem/analytics')
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.count === topic.length);
  });

  it('should GET /admin/user/analytics', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const resStart = await app.httpRequest()
      .get('/admin/user/analytics')
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.count === 1);
  });

  it('should GET /admin/website/analytics', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const resStart = await app.httpRequest()
      .get('/admin/website/analytics')
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body);
  });

  it('should GET /admin/config', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const config = await app.factory.createMany('config', 3);
    const res = await app.httpRequest()
      .get('/admin/config?limit=2&page=2')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 2);
    assert(res.body.count === 3);
    assert(res.body.last_page === 2);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].key);
    assert(res.body.rows[0].value);

    const resSearch = await app.httpRequest()
      .get(`/admin/config?limit=1&sort_type=updated_at&key=${config[0].key}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resSearch.status === 200);
    assert(resSearch.body.page === 1);
    assert(resSearch.body.count === 1);
    assert(resSearch.body.last_page === 1);
    assert(resSearch.body.rows.length === 1);
    assert(resSearch.body.rows[0].key === config[0].key);
    assert(resSearch.body.rows[0].value === config[0].value);
  });

  it('should POST /admin/config/create', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const res = await app.httpRequest()
      .post('/admin/cnofig/create')
      .send({
        key: 'demo',
        value: 'demo',
        remark: 'demo',
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.key === 'demo');
    assert(res.body.value === 'demo');
    assert(res.body.remark === 'demo');
  });

  it('should POST /admin/config/edit', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const config = await app.factory.create('config');
    const res = await app.httpRequest()
      .post('/admin/config/edit')
      .send({
        id: config.id,
        key: 'edit',
        value: 2,
        remark: 0,
      })
      .set({ Authorization: `bearer ${token}` });

    assert(res.status === 200);
    assert(res.body.id === config.id);
    assert(res.body.key === 'edit');
    assert(res.body.value === 2);
    assert(res.body.remark === 0);
  });

  it('should POST /admin/config/delete', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const config = await app.factory.create('config', {
      key: 'demo',
      value: 'demo',
    });
    const resStart = await app.httpRequest()
      .get(`/admin/config/${config.key}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resStart.status === 200);
    assert(resStart.body.key === config.key);

    const res = await app.httpRequest()
      .post('/admin/config/delete')
      .send({
        id: config.id,
      })
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);

    const resEnd = await app.httpRequest()
      .get(`/admin/config/${config.key}`)
      .set({ Authorization: `bearer ${token}` });
    assert(resEnd.status === 404);
  });

});
