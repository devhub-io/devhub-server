'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  async repos({ limit = 5, page = 1, slug = '', status = '', sort_type = '' }) {
    page = page >= 1000 ? 1000 : page;
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
    return await this.ctx.model.Repos.update(
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
  }

  async reposEdit({ id, status }) {
    const repos = await this.ctx.model.Repos.unscoped().findOne({
      where: {
        id,
      },
    });
    repos.status = status;
    repos.save();
  }

}

module.exports = AdminService;
