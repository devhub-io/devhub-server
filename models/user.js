module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'}
  }, {
    tableName: 'users',
    classMethods: {
      associate (models) {
                // associations can be defined here
      }
    }
  })
  return User
}
