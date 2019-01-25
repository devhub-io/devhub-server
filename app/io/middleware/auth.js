'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const id = socket.id;
    const query = socket.handshake.query;

    // User
    const { room, userId } = query;
    app.logger.info('[system] Socket.io #user_info', id, room, userId);

    // room
    app.logger.info('[system] Socket.io #join', room);
    socket.join(room);

    await next();

    // 用户离开
    app.logger.info('[system] Socket.io #leave', room);
  };
};
