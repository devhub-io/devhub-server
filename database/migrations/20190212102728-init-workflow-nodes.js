'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'workflow_nodes',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        workflow_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        next_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        title: {
          type: STRING,
        },
        description: {
          type: STRING(1024),
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
