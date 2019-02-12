'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');
const env = require('../../../.env');

describe('test/app/controller/user.test.js', () => {

  it('should GET /stars', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);

    const resStar = await app.httpRequest()
      .post('/star')
      .set({ Authorization: `bearer ${token}` })
      .type('form')
      .send({
        type: 'repos',
        foreign_id: 1,
        star: 1,
      });
    assert(resStar.status === 200);

    const res = await app.httpRequest()
      .get('/stars')
      .set({ Authorization: `bearer ${token}` });
    assert(res.status === 200);
    assert(res.body.page === 1);
    assert(res.body.count === 1);
    assert(res.body.last_page === 1);
    assert(res.body.rows.length === 1);
    assert(res.body.rows[0].id);
  });

  it('should POST /star', async () => {
    const user = await app.factory.create('user');
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
    const resStar = await app.httpRequest()
      .post('/star')
      .set({ Authorization: `bearer ${token}` })
      .type('form')
      .send({
        type: 'repos',
        foreign_id: 1,
        star: 1,
      });
    assert(resStar.status === 200);

    const resUnStar = await app.httpRequest()
      .post('/star')
      .set({ Authorization: `bearer ${token}` })
      .type('form')
      .send({
        user_id: user.id,
        type: 'repos',
        foreign_id: 1,
        star: 0,
      });
    assert(resUnStar.status === 200);
  });

});
