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

  // ORM
  config.sequelize = {
    dialect: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
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

  // CORS
  exports.security = {
    domainWhiteList: [ 'http://localhost:3000' ],
  };

  return config;
};