'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, DATE, literal } = Sequelize;

    return queryInterface.createTable(
      'failed_jobs',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        connection: {
          type: TEXT,
          allowNull: false,
        },
        queue: {
          type: TEXT,
          allowNull: false,
        },
        payload: {
          type: TEXT,
          allowNull: false,
        },
        exception: {
          type: TEXT,
          allowNull: false,
        },
        failed_at: {
          type: DATE,
          allowNull: false,
          defaultValue: literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
