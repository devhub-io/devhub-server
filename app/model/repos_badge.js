'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  return app.model.define('repos_badge', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    url: {
      type: STRING(255),
      allowNull: false,
    },
    type: {
      type: STRING(15),
      allowNull: false,
    },
  }, {
    tableName: 'repos_badges',
  });
};
