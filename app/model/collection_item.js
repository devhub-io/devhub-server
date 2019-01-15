'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('collection_item', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    collection: {
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
    user_id: {
      type: INTEGER(10).UNSIGNED,
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
    tableName: 'collection_items',
  });
};
