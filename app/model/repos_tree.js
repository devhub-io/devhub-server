'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('repos_tree', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    commit_sha: {
      type: STRING(50),
      allowNull: false,
    },
    sha: {
      type: STRING(50),
      allowNull: false,
    },
    path: {
      type: STRING(255),
      allowNull: false,
    },
    mode: {
      type: STRING(10),
      allowNull: false,
    },
    type: {
      type: STRING(15),
      allowNull: false,
    },
    url: {
      type: STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'repos_trees',
    timestamps: false,
  });
};
