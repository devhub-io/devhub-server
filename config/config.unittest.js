'use strict';

const env = require('../.env.js');

module.exports = () => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: env.DB_TEST_HOST,
    port: env.DB_PORT,
    database: env.DB_TEST_DATABASE,
    username: env.DB_TEST_USERNAME,
    password: env.DB_TEST_PASSWORD,
  };

  return config;
};
