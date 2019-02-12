'use strict';

const Service = require('egg').Service;

class EcosystemService extends Service {

  async workflow({ limit, page }) {
    const Op = this.app.Sequelize.Op;
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Workflow.findAndCountAll({
      attributes: [ 'id', 'title', 'description', 'user_id' ],
      limit,
      offset,
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    // users
    const userId = [];
    for (let i = 0; i < result.rows.length; i++) {
      userId.push(result.rows[i].user_id);
    }
    const users = await this.ctx.model.User.findAll({
      attributes: [ 'id', 'name', 'avatar' ],
      where: {
        id: {
          [Op.in]: userId,
        },
      },
    });
    const userIndex = {};
    for (let i = 0; i < users.length; i++) {
      userIndex[users[i].id] = users[i];
    }
    result.rows = JSON.parse(JSON.stringify(result.rows));
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i].user = userIndex[result.rows[i].user_id];
      delete result.rows[i].user_id;
    }

    return result;
  }

  async workflowFind(id) {
    const ctx = this.ctx;
    const workflow = await ctx.model.Workflow.findOne({
      where: {
        id,
      },
    });
    if (!workflow) {
      this.ctx.throw(404, 'Workflow not found');
    }

    // PV
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = await this.app.redis.get(`devhub:workflow:${workflow.id}:pv:${clientIP}`);
    if (!k) {
      await this.app.redis.set(`devhub:workflow:${workflow.id}:pv:${clientIP}`, 1);
      await this.app.redis.expire(`devhub:workflow:${workflow.id}:pv:${clientIP}`, 24 * 60 * 60);
      workflow.view_number = workflow.view_number + 1;
      await workflow.save();
    }

    const nodes = await ctx.model.WorkflowNode.findAll({
      attributes: [ 'id', 'title', 'description', 'next_id' ],
      where: {
        workflow_id: workflow.id,
      },
    });

    return { workflow, nodes };
  }

  async workflowCreate({ user_id, title, description }) {
    return await this.ctx.model.Workflow.create(
      {
        user_id,
        title,
        description,
      });
  }

  async workflowEdit({ user_id, id, title, description }) {
    const res = await this.ctx.model.Workflow.update(
      {
        title,
        description,
      },
      {
        where: {
          user_id,
          id,
        },
      });
    return { affected: res };
  }

  async workflowDelete({ user_id, id }) {
    const res = await this.ctx.model.Workflow.destroy({
      where: {
        user_id,
        id,
      },
    });
    return { affected: res };
  }

  async workflowNodeCreate({ user_id, workflow_id, next_id, title, description }) {
    return await this.ctx.model.WorkflowNode.create(
      {
        user_id,
        workflow_id,
        next_id,
        title,
        description,
      });
  }

  async workflowNodeEdit({ user_id, id, next_id, title, description }) {
    const res = await this.ctx.model.WorkflowNode.update(
      {
        title,
        description,
        next_id,
      },
      {
        where: {
          user_id,
          id,
        },
      });
    return { affected: res };
  }

  async workflowNodeDelete({ user_id, id }) {
    const res = await this.ctx.model.WorkflowNode.destroy({
      where: {
        user_id,
        id,
      },
    });
    return { affected: res };
  }

  async workflowNodeItemCreate({ user_id, node_id, type, title, foreign_id, sort }) {
    return await this.ctx.model.WorkflowNodeItem.create(
      {
        user_id,
        node_id,
        title,
        type,
        foreign_id,
        sort,
      });
  }

  async workflowNodeItemEdit({ user_id, id, sort }) {
    const res = await this.ctx.model.WorkflowNodeItem.update(
      {
        sort,
      },
      {
        where: {
          user_id,
          id,
        },
      });
    return { affected: res };
  }

  async workflowNodeItemDelete({ user_id, id }) {
    const res = await this.ctx.model.WorkflowNodeItem.destroy({
      where: {
        user_id,
        id,
      },
    });
    return { affected: res };
  }

}

module.exports = EcosystemService;
