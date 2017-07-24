module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {
    tableName: 'categories',
    classMethods: {
      associate (models) {
        // associations can be defined here
      }
    }
  })
  return Category
}
