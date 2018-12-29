'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;

  return app.model.define('repos_tree_content', {
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
    content: {
      type: TEXT,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'repos_tree_content',
  });
};
