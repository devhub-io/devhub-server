'use strict';

const Service = require('egg').Service;

const ENABLE = 1;

class DeveloperService extends Service {
  async findBySlug(slug) {
    const ctx = this.ctx;
    const Op = this.app.Sequelize.Op;
    const developer = await ctx.model.Developer.findOne({
      where: {
        login: slug,
        status: ENABLE,
      },
    });
    if (!developer) {
      this.ctx.throw(404, 'repos not found');
    }

    // PV
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = await this.app.redis.get(`devhub:developer:${developer.id}:pv:${clientIP}`);
    if (!k) {
      await this.app.redis.set(`devhub:developer:${developer.id}:pv:${clientIP}`, 1);
      await this.app.redis.expire(`devhub:developer:${developer.id}:pv:${clientIP}`, 24 * 60 * 60);
      developer.view_number = developer.view_number + 1;
      developer.save();
    }

    const owner_repos = await ctx.model.Repos.findAll({
      attributes: [ 'id', 'slug', 'title', 'cover', 'description', 'stargazers_count', 'trends' ],
      where: {
        owner: developer.login,
        status: ENABLE,
      },
      order: [
        [ 'stargazers_count', 'DESC' ],
      ],
    });

    const contribute_repos = await ctx.model.ReposContributor.findAll({
      include: [{
        model: ctx.model.Repos,
        as: 'repos',
        attributes: [ 'slug', 'title', 'cover', 'description', 'stargazers_count', 'trends' ],
        where: {
          status: ENABLE,
          owner: {
            [Op.ne]: slug,
          },
        },
      }],
      attributes: [ 'repos_id' ],
      where: {
        login: slug,
      },
    });

    const developer_languages = await ctx.model.DeveloperLanguage.findAll({
      attributes: [ 'language', 'bytes' ],
      where: {
        developer_id: developer.id,
      },
      order: [
        [ 'bytes', 'DESC' ],
      ],
    });

    return { developer, owner_repos, contribute_repos, developer_languages };
  }

  async list({ limit = 5, page = 1, type = 'User' }) {
    const Op = this.app.Sequelize.Op;
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Developer.findAndCountAll({
      where: {
        status: ENABLE,
        public_repos: {
          [Op.gt]: 0,
        },
        type,
      },
      limit,
      offset,
      order: [
        [ 'rating', 'DESC' ],
        [ 'followers', 'DESC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async count() {
    return await this.ctx.model.Developer.count();
  }

}

module.exports = DeveloperService;
