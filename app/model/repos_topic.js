'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const ReposTopic = app.model.define('repos_topic', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    topic: {
      type: STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'repos_topics',
    timestamps: false,
  });
  ReposTopic.removeAttribute('id');

  return ReposTopic;
};
