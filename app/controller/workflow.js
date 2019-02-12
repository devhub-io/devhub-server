'use strict';

const Controller = require('egg').Controller;

class WorkflowController extends Controller {

  async workflow() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    ctx.body = await ctx.service.workflow.workflow(query);
  }

  async workflowFind() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    this.ctx.body = await ctx.service.workflow.workflowFind(id);
  }

  async workflowCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowCreate(data);
  }

  async workflowEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowEdit(data);
  }

  async workflowDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowDelete(data);
  }

  async workflowNodeCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeCreate(data);
  }

  async workflowNodeEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeEdit(data);
  }

  async workflowNodeDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeDelete(data);
  }

  async workflowNodeItemCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeItemCreate(data);
  }

  async workflowNodeItemEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeItemEdit(data);
  }

  async workflowNodeItemDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = await ctx.service.workflow.workflowNodeItemDelete(data);
  }

}

module.exports = WorkflowController;
