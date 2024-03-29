'use strict';

module.exports = () => {
  return async function admin(ctx, next) {
    if (ctx.user.id !== 1) {
      ctx.throw(401, 'Not admin');
    }
    await next();
  };
};
