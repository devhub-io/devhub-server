'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'users',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: STRING(255),
          allowNull: false,
        },
        email: {
          type: STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: STRING(255),
          allowNull: false,
        },
        remember_token: {
          type: STRING(100),
          allowNull: true,
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
        },
        google2fa_secret_key: {
          type: STRING(255),
          allowNull: false,
        },
        last_activated_at: {
          type: DATE,
          allowNull: false,
          defaultValue: '0000-00-00 00:00:00',
        },
        avatar: {
          type: STRING(255),
          allowNull: false,
          defaultValue: '',
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
