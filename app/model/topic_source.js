'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  return app.model.define('topic_source', {
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
    source: {
      type: STRING(20),
    },
    url: {
      type: STRING,
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
    tableName: 'topic_source',
  });
};
