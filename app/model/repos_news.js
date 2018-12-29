'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, DATEONLY } = app.Sequelize;

  return app.model.define('repos_news', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: STRING(255),
      allowNull: false,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    score: {
      type: INTEGER(6),
      allowNull: false,
    },
    time: {
      type: INTEGER(11),
      allowNull: false,
    },
    item_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    post_date: {
      type: DATEONLY,
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
    tableName: 'repos_news',
  });
};
