'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;

  return app.model.define('service', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    provider: {
      type: STRING(255),
      allowNull: false,
    },
    name: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    token: {
      type: STRING(255),
      allowNull: false,
    },
    secret: {
      type: STRING(255),
      allowNull: false,
    },
    refresh_token: {
      type: STRING(255),
      allowNull: false,
    },
    expires_at: {
      type: DATE,
      allowNull: true,
    },
    options: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
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
    tableName: 'services',
  });
};
