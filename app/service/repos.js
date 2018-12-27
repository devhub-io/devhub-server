'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(flag) {
    const user = await this.ctx.db.query('select * from user where uid = ?', flag);
    return user;
  }
}

module.exports = UserService;
