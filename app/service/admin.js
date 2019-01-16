'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  async repos({ limit = 5, page = 1, slug = '', status = '', sort_type = '' }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (slug !== '') {
      where.slug = slug;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Repos.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async reposSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Repos.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
        },
      });
    return { affected: res };
  }

  async reposEdit({ id, status }) {
    const repos = await this.ctx.model.Repos.unscoped().findOne({
      where: {
        id,
      },
    });
    repos.status = status;
    const res = repos.save();
    return { affected: res };
  }

  async developers({ limit = 5, page = 1, login = '', status = '', sort_type = '', type = '' }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (login !== '') {
      where.login = login;
    }
    if (type !== '') {
      where.type = type;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Developer.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async developerSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Developer.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
        },
      });
    return { affected: res };
  }

  async developerEdit({ id, status }) {
    const developer = await this.ctx.model.Developer.unscoped().findOne({
      where: {
        id,
      },
    });
    developer.status = status;
    const res = developer.save();
    return { affected: res };
  }

  async ecosystems({ limit = 5, page = 1, slug = '', status = '', sort_type = '' }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (slug !== '') {
      where.slug = slug;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Topic.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async ecosystemSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Topic.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
        },
      });
    return { affected: res };
  }

  async ecosystemEdit({ id, status }) {
    const topic = await this.ctx.model.Topic.unscoped().findOne({
      where: {
        id,
      },
    });
    topic.status = status;
    const res = topic.save();
    return { affected: res };
  }

}

module.exports = AdminService;
