'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('link', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      defaultValue: '',
    },
    summary: {
      type: STRING(1024),
      defaultValue: '',
    },
    source: {
      type: STRING,
      defaultValue: '',
    },
    url: {
      type: STRING,
    },
    user_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
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
    tableName: 'links',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
