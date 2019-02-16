'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const jwt = require('jsonwebtoken');
const env = require('../../../.env');

describe('test/app/controller/workflow.test.js', () => {

  describe('GET /workflow', () => {
    it('should work', async () => {
      await app.factory.createMany('workflow', 2);
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const res = await app.httpRequest().get('/workflow?limit=2&page=1');
      assert(res.status === 200);
      assert(res.body.page === 1);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].user.name);
      assert(res.body.rows[0].user.avatar);
    });
  });

  describe('GET /workflow/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const res = await app.httpRequest().get(`/workflow/${resWorkflow.body.id}`);
      assert(res.status === 200);
      assert(res.body.workflow.id === resWorkflow.body.id);
      assert(res.body.workflow.title === resWorkflow.body.title);
      assert(res.body.workflow.description === resWorkflow.body.description);
      assert(res.body.nodes.length === 1);
      assert(res.body.nodes[0].title === resNode.body.title);
      assert(res.body.nodes[0].description === resNode.body.description);
    });
  });

  describe('POST /workflow/create', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const res = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(res.status === 200);
      assert(res.body.id);

      const resWorkflow = await app.httpRequest().get(`/workflow/${res.body.id}`);
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.workflow.id === res.body.id);
      assert(resWorkflow.body.workflow.title === res.body.title);
    });
  });

  describe('POST /workflow/edit', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const res = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(res.status === 200);
      assert(res.body.id);

      const resEdit = await app.httpRequest()
        .post('/workflow/edit')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: res.body.id,
          title: 'workflow_edit',
          description: 'description_edit',
        });
      assert(resEdit.status === 200);

      const resWorkflow = await app.httpRequest().get(`/workflow/${res.body.id}`);
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.workflow.id === res.body.id);
      assert(resWorkflow.body.workflow.title === 'workflow_edit');
      assert(resWorkflow.body.workflow.description === 'description_edit');
    });
  });

  describe('POST /workflow/delete', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const res = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(res.status === 200);
      assert(res.body.id);

      const resEdit = await app.httpRequest()
        .post('/workflow/delete')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: res.body.id,
        });
      assert(resEdit.status === 200);

      const resWorkflow = await app.httpRequest().get(`/workflow/${res.body.id}`);
      assert(resWorkflow.status === 404);
    });
  });

  describe('POST /workflow/node/create', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);
    });
  });

  describe('POST /workflow/node/edit', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const resNodeEdit = await app.httpRequest()
        .post('/workflow/node/edit')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: resNode.body.id,
          next_id: 0,
          title: 'node_edit',
          description: 'description_edit',
        });
      assert(resNodeEdit.status === 200);
    });
  });

  describe('POST /workflow/node/delete', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const resNodeDelete = await app.httpRequest()
        .post('/workflow/node/delete')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: resNode.body.id,
        });
      assert(resNodeDelete.status === 200);
    });
  });

  describe('POST /workflow/node/item/create', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const resItem = await app.httpRequest()
        .post('/workflow/node/item/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          node_id: resNode.body.id,
          title: 'item',
          type: 'repos',
          foreign_id: 1,
          sort: 0,
        });
      assert(resItem.status === 200);
      assert(resItem.body.id);
    });
  });

  describe('POST /workflow/node/item/edit', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const resItem = await app.httpRequest()
        .post('/workflow/node/item/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          node_id: resNode.body.id,
          title: 'item',
          type: 'repos',
          foreign_id: 1,
          sort: 0,
        });
      assert(resItem.status === 200);
      assert(resItem.body.id);

      const resItemEdit = await app.httpRequest()
        .post('/workflow/node/item/edit')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: resItem.body.id,
          sort: 0,
        });
      assert(resItemEdit.status === 200);
    });
  });

  describe('POST /workflow/node/item/delete', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const token = jwt.sign({ sub: user.id }, env.JWT_SECRET);
      const resWorkflow = await app.httpRequest()
        .post('/workflow/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          title: 'workflow',
          description: 'description',
        });
      assert(resWorkflow.status === 200);
      assert(resWorkflow.body.id);

      const resNode = await app.httpRequest()
        .post('/workflow/node/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          workflow_id: resWorkflow.body.id,
          next_id: 0,
          title: 'node',
          description: 'description',
        });
      assert(resNode.status === 200);
      assert(resNode.body.id);

      const resItem = await app.httpRequest()
        .post('/workflow/node/item/create')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          node_id: resNode.body.id,
          title: 'item',
          type: 'repos',
          foreign_id: 1,
          sort: 0,
        });
      assert(resItem.status === 200);
      assert(resItem.body.id);

      const resItemDelete = await app.httpRequest()
        .post('/workflow/node/item/delete')
        .set({ Authorization: `bearer ${token}` })
        .type('form')
        .send({
          id: resItem.body.id,
        });
      assert(resItemDelete.status === 200);
    });
  });

});
