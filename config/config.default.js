'use strict';

const env = require('../.env.js');

module.exports = appInfo => {
  const config = exports = {};

  // app
  config.app_name = 'devhub';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545906655111_6691';

  // add your config here
  config.middleware = [];

  // mysql
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: env.DB_HOST,
      // 端口号
      port: env.DB_PORT,
      // 用户名
      user: env.DB_USERNAME,
      // 密码
      password: env.DB_PASSWORD,
      // 数据库名
      database: env.DB_DATABASE,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
