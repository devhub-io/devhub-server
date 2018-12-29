'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'developer_languages',
      {
        developer_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        language: {
          type: STRING(20),
          allowNull: false,
        },
        bytes: {
          type: INTEGER(11),
          allowNull: false,
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
