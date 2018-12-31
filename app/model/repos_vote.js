'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('repos_vote', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    reliable: {
      type: INTEGER(4),
      allowNull: false,
    },
    recommendation: {
      type: INTEGER(4),
      allowNull: false,
    },
    documentation: {
      type: INTEGER(4),
      allowNull: false,
    },
    ip: {
      type: STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    user_agent: {
      type: STRING(255),
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
    tableName: 'repos_vote',
  });
};
