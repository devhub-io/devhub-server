'use strict';

const Service = require('egg').Service;

class EcosystemService extends Service {

  async topics({ limit = 5, page = 1 }) {
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Topic.findAndCountAll({
      limit,
      offset,
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

}

module.exports = EcosystemService;
