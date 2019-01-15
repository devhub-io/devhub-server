'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'links',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: STRING,
        },
        summary: {
          type: STRING(1024),
        },
        source: {
          type: STRING,
        },
        url: {
          type: STRING,
        },
        user_id: {
          type: INTEGER(10).UNSIGNED,
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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  },
};
