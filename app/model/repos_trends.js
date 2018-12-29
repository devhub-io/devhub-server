'use strict';

module.exports = app => {
  const { INTEGER, DATEONLY } = app.Sequelize;

  return app.model.define('repos_trends', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    overall: {
      type: INTEGER(11),
      allowNull: false,
    },
    trend: {
      type: INTEGER(11),
      allowNull: false,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
  }, {
    tableName: 'repos_trends',
  });
};
