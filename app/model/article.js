'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;

  return app.model.define('article', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    slug: {
      type: STRING(255),
      allowNull: false,
    },
    description: {
      type: STRING(500),
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    url: {
      type: STRING(255),
      allowNull: false,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    read_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    up_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    down_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    fetched_at: {
      type: DATE,
      allowNull: true,
    },
    source: {
      type: STRING(20),
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
    tableName: 'articles',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
