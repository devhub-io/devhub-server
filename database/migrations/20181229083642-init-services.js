'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;

    return queryInterface.createTable(
      'services',
      {
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
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
