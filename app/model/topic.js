'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Topic = app.model.define('topic', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
    },
    slug: {
      type: STRING,
      unique: true,
    },
    description: {
      type: STRING(1024),
    },
    homepage: {
      type: STRING,
    },
    github: {
      type: STRING,
    },
    wiki: {
      type: STRING,
    },
    user_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    sort: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    view_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'topics',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });

  Topic.associate = function() {
    app.model.Topic.hasMany(app.model.Collection);
  };

  return Topic;
};
