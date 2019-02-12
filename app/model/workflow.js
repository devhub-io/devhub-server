'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('workflow', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    title: {
      type: STRING,
    },
    description: {
      type: STRING(1024),
    },
    view_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: INTEGER(4),
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
    tableName: 'workflow',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
