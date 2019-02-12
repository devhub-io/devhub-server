'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'workflow_node_items',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        node_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
        },
        title: {
          type: STRING,
        },
        type: {
          type: STRING(20),
        },
        foreign_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        sort: {
          type: INTEGER(6),
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
