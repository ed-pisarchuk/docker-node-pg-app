'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Device extends Model {
        static associate(models) {
            models.device.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'})
            models.device.belongsTo(models.deviceType, {foreignKey: 'typeId', targetKey: 'id'})
        }
    }

    Device.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        typeId: DataTypes.INTEGER,
        mac: DataTypes.STRING,
        name: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'device',
        tableName: 'devices'
    })
    return Device
}