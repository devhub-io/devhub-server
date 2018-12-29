'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('repos_tag', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    name: {
      type: STRING(20),
      allowNull: false,
    },
    zipball_url: {
      type: STRING(255),
      allowNull: false,
    },
    tarball_url: {
      type: STRING(255),
      allowNull: false,
    },
    commit_sha: {
      type: STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'repos_tags',
  });
};
