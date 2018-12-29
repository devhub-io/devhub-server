'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('repos_language', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
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
    tableName: 'repos_languages',
  });
};
