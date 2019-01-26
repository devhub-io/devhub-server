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

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
