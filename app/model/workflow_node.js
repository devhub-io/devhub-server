'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('workflow_node', {
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
    workflow_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    next_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    title: {
      type: STRING,
    },
    description: {
      type: STRING(1024),
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
    tableName: 'workflow_nodes',
  });
};
