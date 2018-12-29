'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('link_click', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    target: {
      type: STRING(255),
      allowNull: false,
    },
    referer: {
      type: STRING(255),
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
    clicked_at: {
      type: DATE,
      allowNull: false,
      defaultValue: app.model.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'link_click',
  });
};
