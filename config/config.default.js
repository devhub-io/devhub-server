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

  // log
  exports.logrotator = {
    // list of files that will be rotated by hour
    filesRotateByHour: [],
    // rotate the file by hour use specified delimiter
    hourDelimiter: '-',
    // list of files that will be rotated by size
    filesRotateBySize: [],
    // Max file size to judge if any file need rotate
    maxFileSize: 50 * 1024 * 1024,
    // pieces rotate by size
    maxFiles: 10,
    // time interval to judge if any file need rotate
    rotateDuration: 60000,
    // keep max days log files, default is `31`. Set `0` to keep all logs
    maxDays: 0,
  };

  return config;
};
