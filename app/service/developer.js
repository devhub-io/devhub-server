'use strict';

const Service = require('egg').Service;

class DeveloperService extends Service {

  async findBySlug(slug) {
    const ctx = this.ctx;
    const Op = this.app.Sequelize.Op;
    const developer = await ctx.model.Developer.findOne({
      where: {
        login: slug,
      },
    });
    if (!developer) {
      this.ctx.throw(404, 'Developer not found');
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

  async createFromGithubAPI(data) {
    const login = data.login;

    const find = await this.ctx.model.Developer.findOne({
      attributes: [ 'id' ],
      where: {
        login,
      },
    });

    if (find) {
      return false;
    }
    return await this.ctx.model.Developer.create({
      login: data.login,
      github_id: data.id,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      type: data.type,
      site_admin: data.site_admin,
      name: data.name || '',
      company: data.company || '',
      blog: data.blog || '',
      location: data.location || '',
      email: data.email || '',
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      site_created_at: data.created_at,
      site_updated_at: data.updated_at,
      fetched_at: new Date(),
      analytics_at: new Date(),
    });
  }

}

module.exports = DeveloperService;
