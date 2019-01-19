'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE, DATEONLY } = app.Sequelize;

  const ReposNews = app.model.define('repos_news', {
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
    status: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
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
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });

  ReposNews.associate = function() {
    app.model.ReposNews.hasOne(app.model.Repos, { as: 'repos', foreignKey: 'id', sourceKey: 'repos_id' });
  };

  return ReposNews;
};
