'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'sites',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: STRING(255),
          allowNull: false,
        },
        url: {
          type: STRING(255),
          allowNull: false,
        },
        category: {
          type: STRING(255),
          allowNull: false,
        },
        screenshot: {
          type: STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        sort: {
          type: INTEGER(6),
          allowNull: false,
        },
        status: {
          type: INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        icon: {
          type: STRING(255),
          allowNull: false,
        },
        description: {
          type: STRING(255),
          allowNull: false,
        },
        level: {
          type: INTEGER(4),
          allowNull: false,
          defaultValue: '1',
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
        },
        user_id: {
          type: INTEGER(11),
          allowNull: false,
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
