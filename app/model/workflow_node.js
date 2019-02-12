'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('workflow_node', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    workflow_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    title: {
      type: STRING,
    },
    description: {
      type: STRING(1024),
    },
    next_id: {
      type: INTEGER(10).UNSIGNED,
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
    tableName: 'collection_items',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
