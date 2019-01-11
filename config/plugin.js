'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.proxyagent = {
  enable: true,
  package: 'egg-development-proxyagent',
};

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportJwt = {
  enable: true,
  package: 'egg-passport-jwt',
};
