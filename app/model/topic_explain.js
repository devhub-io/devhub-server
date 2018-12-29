'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  return app.model.define('topic_explain', {
    topic: {
      type: STRING(50),
      allowNull: false,
    },
    explain: {
      type: STRING(1000),
      allowNull: false,
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
    tableName: 'topic_explain',
  });
};
