'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, DATEONLY } = Sequelize;

    return queryInterface.createTable(
      'repos_news',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          type: STRING(255),
          allowNull: false,
        },
        title: {
          type: STRING(255),
          allowNull: false,
        },
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        score: {
          type: INTEGER(6),
          allowNull: false,
        },
        time: {
          type: INTEGER(11),
          allowNull: false,
        },
        item_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        post_date: {
          type: DATEONLY,
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
