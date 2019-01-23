'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'repos_dependencies',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        source: {
          type: STRING(15),
          allowNull: false,
        },
        env: {
          type: STRING(15),
          allowNull: false,
        },
        package: {
          type: STRING(100),
          allowNull: false,
        },
        version: {
          type: STRING(50),
          allowNull: false,
        },
        version_condition: {
          type: STRING(10),
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
};
