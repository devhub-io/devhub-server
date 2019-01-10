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

  exports.redis = {
    client: {
      port: env.REDIS_PORT,
      host: env.REDIS_HOST,
      password: env.REDIS_PASSWORD,
      db: 1,
    },
  };

  exports.elasticsearch = {
    host: env.ELASTICSEARCH_HOST,
    index: 'devhub_test',
  };

  return config;
};
