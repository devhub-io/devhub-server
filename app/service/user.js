'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async oauthRegister(user) {
    const service = await this.ctx.model.Service.findOne({
      where: {
        uid: user.id,
        provider: user.provider,
      },
    });
    if (!service) {
      const siteUser = await this.ctx.model.User.create({
        name: user.name,
        email: `${user.provider}_${user.id}@devhub.io`,
        password: '',
        last_activated_at: new Date(),
        avatar: user.photo,
      });

      await this.ctx.model.Service.create({
        user_id: siteUser.id,
        uid: user.id,
        provider: user.provider,
        name: user.provider,
        token: user.accessToken,
        secret: '',
        refresh_token: user.refreshToken || '',
        options: JSON.stringify(user),
      });
      return siteUser;
    }
    const existsUser = await this.ctx.model.User.findOne({
      where: {
        id: service.user_id,
      },
    });
    if (existsUser) {
      service.access_token = user.accessToken;
      await service.save();
      existsUser.last_activated_at = new Date();
      await existsUser.save();
      return existsUser;
    }
    return false;
  }

  async updateUserGithubRemaining(id, headers) {
    if ('x-ratelimit-remaining' in headers && 'x-ratelimit-reset' in headers) {
      const { app } = this;
      const remaining = parseInt(headers['x-ratelimit-remaining']);
      const reset = parseInt(headers['x-ratelimit-reset']);
      const timestamp = Math.floor(Date.now() / 1000);

      await app.redis.set(`devhub:user:${id}:github:remaining`, remaining);
      await app.redis.expire(`devhub:user:${id}:github:remaining`, reset - timestamp > 0 ? reset - timestamp : 3600);
      app.logger.info(`[system] Github API #UserID:${id} Remaining:${remaining}`);
      return true;
    }
    return false;
  }

  async selectUserId() {
    const { app, ctx } = this;
    const ids = await app.redis.smembers('devhub:user:github:id');
    if (ids !== null && ids.length > 0) {
      const availableId = [];
      for (let i = 0; i < ids.length; i++) {
        let remaining = await app.redis.get(`devhub:user:${ids[i]}:github:remaining`);
        if (remaining === null) {
          remaining = 5000;
        }
        if (parseInt(remaining) > 100) {
          availableId.push(ids[i]);
        }
      }
      const randomId = availableId[Math.floor(Math.random() * availableId.length)];

      app.logger.info(`[system] Job use #UserID: ${randomId}`);

      return ctx.helper.toInt(randomId);
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
    if (services.length > 0) {
      await app.redis.del('devhub:user:github:id');
      services.forEach(async i => {
        app.redis.set(`devhub:user:${i.user_id}:github:remaining`, 5000);
        app.redis.sadd('devhub:user:github:id', i.user_id);
      });

      app.logger.info(`[system] Job use #UserID: ${services[0].user_id}`);

      return services[0].user_id;
    }
    return null;
  }

  async userGithubToken({ id }) {
    const { app } = this;
    const token = await app.redis.get(`devhub:user:${id}:github:token`);
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
        app.redis.set(`devhub:user:${id}:github:token`, result.token);
        return result.token;
      }
      return null;
    });
  }

  async feedback(data) {
    data.ip = this.ctx.helper.getIP();
    if (data.properties) {
      data.properties = JSON.stringify(data.properties);
    }
    return await this.ctx.model.Feedback.create(
      data,
      {
        fields: [ 'message', 'email', 'user_id', 'tags', 'ip', 'properties' ],
      });
  }

  async star({ user_id, type, foreign_id, star }) {
    if (star) {
      const star = await this.ctx.model.UserStar.findOne({
        where: {
          user_id,
          type,
          foreign_id,
        },
      });
      if (!star) {
        return await this.ctx.model.UserStar.create(
          {
            user_id,
            type,
            foreign_id,
          });
      }
      return false;
    }
    return await this.ctx.model.UserStar.destroy({
      where: {
        user_id,
        type,
        foreign_id,
      },
      limit: 1,
    });
  }

  async stars({ limit, page }) {
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.UserStar.findAndCountAll({
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

module.exports = UserService;
