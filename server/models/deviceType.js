'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class DeviceType extends Model {
        static associate(models) {
            models.deviceType.hasMany(models.device, {foreignKey: 'typeId', sourceKey: 'id'})
        }
    }

    DeviceType.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'deviceType',
        tableName: 'deviceTypes'
    })
    return DeviceType
}