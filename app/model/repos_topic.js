'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const Topic = app.model.define('repos_topic', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    topic: {
      type: STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'repos_topics',
    timestamps: false,
  });
  Topic.removeAttribute('id');

  return Topic;
};
