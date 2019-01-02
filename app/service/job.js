'use strict';

const Service = require('egg').Service;
const octokit = require('@octokit/rest')();

const REPOS_URL_REGEX = /https?:\/\/github\.com\/([0-9a-zA-Z\-\.]*)\/([0-9a-zA-Z\-\.]*)/i;
// const README_URL_REGEX = '/https?:\\/\\/github\\.com\\/[0-9a-zA-Z\\-\\.]*\\/[0-9a-zA-Z\\-\\.]*/';
// const DEVELOPER_URL_REGEX = '/^https?:\\/\\/github\\.com\\/([0-9a-zA-Z\\-\\.]*)$/';
const GITHUB_LIMIT = 100;

class JobService extends Service {

  async process(payload) {
    return await this[payload.job](payload.data);
  }

  async githubFetch(data) {
    const { app, ctx } = this;

    console.log(data);


    const found = data.url.match(REPOS_URL_REGEX);
    if (found) {
      const exists = await ctx.model.Repos.findOne({
        attributes: [ 'id' ],
        where: {
          slug: `${found[1]}-${found[2]}`,
        },
      }).then(result => {
        return result !== null;
      });
      if (exists) {
        app.logger.info('[system] GithubFetch Job Repos exists: ' + data.url);
        return false;
      }

      const id = await this.selectUserId();
      if (!id) {
        app.logger.info('[system] GithubFetch Job not UserId');
        return false;
      }

      const token = await this.userGithubToken({ id });

      octokit.authenticate({
        type: 'oauth',
        token,
      });

      octokit.repos.get({
        owner: found[1],
        repo: found[2],
      }).then(({ data, headers, status }) => {
        console.log(data);
        console.log(headers);
        console.log(status);
        this.updateUserGithubRemaining(id, headers);

        this.ctx.service.repos.createFromGithubAPI(id, data);
      }).catch(e => {
        console.log(e.status);
        console.log(e.message);

        this.updateUserGithubRemaining(id, e.headers);
      });
    }
  }

  async updateUserGithubRemaining(id, headers) {
    const { app } = this;
    const remaining = parseInt(headers['x-ratelimit-remaining']) || 0;
    const reset = parseInt(headers['x-ratelimit-reset']) || 0;
    const timestamp = Math.floor(Date.now() / 1000);

    await app.redis.set(`user:${id}:github:remaining`, remaining);
    await app.redis.expire(`user:${id}:github:remaining`, reset - timestamp > 0 ? reset - timestamp : 3600);
  }

  async selectUserId() {
    const { app, ctx } = this;
    const ids = await app.redis.smembers('user:github:id');
    if (ids !== null && ids.length > 0) {
      const availableId = [];
      for (let i = 0; i < ids.length; i++) {
        let remaining = await app.redis.get(`user:${ids[i]}:github:remaining`);
        if (remaining === null) {
          remaining = 5000;
        }
        if (parseInt(remaining) > GITHUB_LIMIT) {
          availableId.push(ids[i]);
        }
      }
      const randomId = availableId[Math.floor(Math.random() * availableId.length)];

      app.logger.info(`[system] Job use UserID: ${randomId}`);

      return randomId;
    }

    const Op = app.Sequelize.Op;
    const services = await ctx.model.Service.findAll({
      attributes: [ 'user_id' ],
      where: {
        provider: 'github',
        token: {
          [Op.ne]: '',
        },
      },
    });
    if (services) {
      await app.redis.del('user:github:id');
      services.forEach(async i => {
        app.redis.set(`user:${i.user_id}:github:remaining`, 5000);
        app.redis.sadd('user:github:id', i.user_id);
      });

      app.logger.info(`[system] Job use UserID: ${services[0].user_id}`);

      return services[0].user_id;
    }
    return null;
  }

  async userGithubToken({ id }) {
    const { app } = this;
    const token = await app.redis.get(`user:${id}:github:token`);
    if (token) {
      return token;
    }
    return await this.ctx.model.Service.findOne({
      attributes: [ 'token' ],
      where: {
        user_id: id,
      },
    }).then(result => {
      if (result) {
        app.redis.set(`user:${id}:github:token`, result.token);
        return result.token;
      }
      return null;
    });
  }

}

module.exports = JobService;
