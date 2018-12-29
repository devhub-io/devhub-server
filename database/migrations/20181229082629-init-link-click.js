'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, literal } = Sequelize;

    return queryInterface.createTable(
      'link_click',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        target: {
          type: STRING(255),
          allowNull: false,
        },
        referer: {
          type: STRING(255),
          allowNull: false,
        },
        ip: {
          type: STRING(64),
          allowNull: false,
          defaultValue: '',
        },
        user_agent: {
          type: STRING(255),
          allowNull: false,
        },
        clicked_at: {
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
