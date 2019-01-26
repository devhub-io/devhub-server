'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;

  return app.model.define('feedback', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    message: {
      type: TEXT,
    },
    email: {
      type: STRING(100),
    },
    ip: {
      type: STRING(100),
    },
    sentiment: {
      type: STRING(20),
    },
    tags: {
      type: STRING,
    },
    properties: {
      type: STRING(2048),
    },
    status: {
      type: INTEGER(1),
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
    tableName: 'feedback',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
