module.exports = function (sequelize, DataTypes) {
  const Collection = sequelize.define('Collection', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {
    tableName: 'collection',
    classMethods: {
      associate (models) {
        // associations can be defined here
      }
    }
  })
  return Collection
}
