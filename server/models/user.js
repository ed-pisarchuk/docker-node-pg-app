'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            models.user.hasMany(models.device, {foreignKey: 'userId', sourceKey: 'id'})
        }
    }

    User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user',
        tableName: 'users'
    })
    return User
}