'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'topics',
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
        slug: {
          type: STRING,
          unique: true,
        },
        description: {
          type: STRING(1024),
        },
        homepage: {
          type: STRING,
        },
        github: {
          type: STRING,
        },
        wiki: {
          type: STRING,
        },
        user_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        sort: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        view_number: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: INTEGER(4),
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
