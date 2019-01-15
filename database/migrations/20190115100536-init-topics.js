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
          type: STRING,
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
