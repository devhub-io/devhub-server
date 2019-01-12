'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const env = require('../../.env');

class HomeController extends Controller {

  async github() {
    const ctx = this.ctx;
    const clientId = env.GITHUB_CLIENT_ID;
    let source = ctx.query.source || '';
    source = source.length > 0 ? '?source=' + source : '';
    const redirectUri = encodeURIComponent(`${ctx.request.protocol}://${ctx.request.host}/passport/github/callback${source}`);
    const base = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    ctx.redirect(base, 302);
  }

  async callback() {
    const ctx = this.ctx;
    const app = this.app;
    const query = { code: ctx.query.code };
    let source = ctx.query.source || '';
    source = decodeURIComponent(source);

    const tokenResult = await app.curl('https://github.com/login/oauth/access_token', {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      timeout: 60000,
      data: {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: query.code,
      },
    });

    if (tokenResult.data.hasOwnProperty('access_token')) {
      const accessToken = tokenResult.data.access_token;
      const tokenType = tokenResult.data.token_type;

      const userResult = await app.curl('https://api.github.com/user', {
        dataType: 'json',
        timeout: 60000,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      if (userResult.data.hasOwnProperty('id')) {
        const profile = userResult.data;
        const refreshToken = '';
        const params = tokenResult.data;

        const user = {
          provider: 'github',
          id: profile.id,
          name: profile.login,
          displayName: profile.name,
          photo: profile.avatar_url,
          accessToken,
          refreshToken,
          params,
          profile,
        };

        // 检查用户
        const service = await ctx.model.Service.findOne({
          where: {
            uid: user.id,
            provider: user.provider,
          },
        });
        if (service) {
          const existsUser = await ctx.model.User.findOne({
            where: {
              id: service.user_id,
            },
          });
          if (existsUser) {
            const token = jwt.sign({ sub: existsUser.id }, env.JWT_SECRET);
            ctx.redirect(`${source}?token=${token}`, 302);
            return true;
          }
        }
        // 注册新用户
        const newUser = await ctx.service.user.oauthRegister(user);
        const token = jwt.sign({ sub: newUser.id }, env.JWT_SECRET);
        ctx.redirect(`${source}?token=${token}`, 302);
        return true;
      }
    }

    ctx.redirect(`${source}?status=error`, 302);
    return false;
  }

}

module.exports = HomeController;
