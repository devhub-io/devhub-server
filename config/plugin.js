'use strict';

// had enabled by egg
// exports.static = true;
exports.logrotator = {
  enable: true,
  package: 'egg-logrotator',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
