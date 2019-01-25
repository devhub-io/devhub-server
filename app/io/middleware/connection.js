'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // ctx.socket.emit('res', 'connected!');
    // if (true) {
    //   ctx.socket.disconnet();
    // }
    await next();
    // execute when disconnect.
    console.log('disconnection!');
  };
};
