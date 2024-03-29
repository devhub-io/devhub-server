'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('workflow_node_item', {
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
    node_id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    title: {
      type: STRING,
    },
    type: {
      type: STRING(20),
    },
    foreign_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
    },
    sort: {
      type: INTEGER(6),
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
    tableName: 'workflow_node_items',
  });
};
