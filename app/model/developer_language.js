'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('developer_language', {
    developer_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    language: {
      type: STRING(20),
      allowNull: false,
    },
    bytes: {
      type: INTEGER(11),
      allowNull: false,
    },
  }, {
    tableName: 'developer_languages',
    timestamps: false,
  });
};
