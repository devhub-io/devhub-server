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

});