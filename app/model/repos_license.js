'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('repos_license', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    key: {
      type: STRING(20),
      allowNull: false,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    spdx_id: {
      type: STRING(20),
      allowNull: false,
    },
    featured: {
      type: INTEGER(1),
      allowNull: false,
    },
  }, {
    tableName: 'repos_licenses',
  });
};
