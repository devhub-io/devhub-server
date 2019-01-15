'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('wiki', {
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
    },
    summary: {
      type: STRING(1024),
    },
    source: {
      type: STRING,
    },
    url: {
      type: STRING,
    },
    user_id: {
      type: INTEGER(10).UNSIGNED,
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
    tableName: 'wikis',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
