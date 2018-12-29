'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  return app.model.define('password_resets', {
    email: {
      type: STRING(255),
      allowNull: false,
    },
    token: {
      type: STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'password_resets',
  });
};
