'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, TEXT } = Sequelize;

    return queryInterface.createTable(
      'queue_jobs',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        queue: {
          type: STRING,
        },
        payload: {
          type: TEXT,
        },
        attempts: {
          type: INTEGER(3).UNSIGNED,
        },
        reserved: {
          type: INTEGER(3).UNSIGNED,
        },
        reserved_at: {
          type: DATE,
          allowNull: true,
        },
        available_at: {
          type: DATE,
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
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  },
};
