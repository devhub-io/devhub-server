'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.logrotator = {
  enable: true,
  package: 'egg-logrotator',
};
