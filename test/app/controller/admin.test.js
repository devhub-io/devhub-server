'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');
const env = require('../../../.env');

describe('test/app/controller/admin.test.js', () => {

  it('should GET /admin', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    return app.httpRequest()
      .get('/admin')
      .set({ Authorization: `bearer ${token}` })
      .expect(200);
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
      .get(`/admin/sites?limit=1&page=1&sort_type=updated_at&title=${sites[0].title}&url=${sites[0].url}&status=${sites[0].status}`)
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
      .get(`/admin/links?limit=1&page=1&sort_type=updated_at&title=${links[0].title}&url=${links[0].url}&status=${links[0].status}`)
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
      .get(`/admin/wiki?limit=1&page=1&sort_type=updated_at&title=${wiki[0].title}&url=${wiki[0].url}&status=${wiki[0].status}`)
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
      .get(`/admin/news?limit=1&page=1&sort_type=updated_at&title=${news[0].title}&post_date=${news[0].post_date}&status=${news[0].status}`)
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
      .get(`/admin/articles?limit=1&page=1&sort_type=updated_at&title=${articles[0].title}&url=${articles[0].url}&status=${articles[0].status}`)
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
      .get(`/admin/repos?limit=1&page=1&sort_type=stargazers_count&slug=${repos[0].slug}&status=${repos[0].status}`)
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
      .get(`/admin/developers?limit=1&page=1&sort_type=view_number&login=${developers[0].login}&status=${developers[0].status}&type=${developers[0].type}`)
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
      .get(`/admin/ecosystems?limit=1&page=1&sort_type=sort&slug=${topics[0].slug}&status=${topics[0].status}}`)
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

  it('should POST /admin/ecosystem/collection/fetch', async () => {
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
      .post('/admin/ecosystem/collection/fetch')
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

});
