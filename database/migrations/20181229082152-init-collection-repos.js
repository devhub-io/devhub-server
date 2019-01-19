'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;

    return queryInterface.createTable(
      'collection_repos',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        collection_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        sort: {
          type: INTEGER(4),
          allowNull: false,
        },
        status: {
          type: INTEGER(1),
          allowNull: false,
          defaultValue: 1,
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
