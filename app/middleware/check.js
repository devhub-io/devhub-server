'use strict';

const jwt = require('jsonwebtoken');
const env = require('../../.env');

module.exports = () => {
  return async function admin(ctx, next) {

    try {
      if ('authorization' in ctx.headers) {
        const auth = ctx.headers.authorization;
        const token = auth.replace('Bearer ', '');
        const decoded = jwt.verify(token, env.JWT_SECRET);
        // if (decoded.iat > (Math.floor(Date.now() / 1000))) {
        // TODO
        // }
        const user = await ctx.model.User.findOne({
          where: {
            id: decoded.sub,
          },
        });
        ctx.login(user);
      }
    } catch (e) {
      console.log(e);
    }

    await next();
  };
};
