'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  return app.model.define('topic_attribute', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    key: {
      type: STRING,
    },
    value: {
      type: STRING(2048),
    },
    sort: {
      type: INTEGER(11),
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
    tableName: 'topic_attributes',
  });
};
