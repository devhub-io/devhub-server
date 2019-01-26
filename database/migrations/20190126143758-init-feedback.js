'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, TEXT } = Sequelize;

    return queryInterface.createTable(
      'feedback',
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
          defaultValue: 0,
        },
        message: {
          type: TEXT,
        },
        email: {
          type: STRING(100),
        },
        ip: {
          type: STRING(100),
        },
        sentiment: {
          type: STRING(20),
        },
        tags: {
          type: STRING,
        },
        properties: {
          type: STRING(2048),
        },
        status: {
          type: INTEGER(1),
          allowNull: false,
          defaultValue: 0,
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
};
