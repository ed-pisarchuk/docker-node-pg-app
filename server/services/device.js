const models = require('../models')
const BaseService = require('../base/BaseService')

class DeviceService extends BaseService {

    constructor() {
        super();
    }

    getList(data) {
        let params = {
            attributes: ["id", "name", "mac",
                [models.sequelize.literal('"deviceType".name'), "type"],
                [models.sequelize.literal('"user".name'), "user_name"],
                [models.sequelize.literal('"user".email'), "user_email"]
            ],
            include: [{model: models.deviceType, attributes: []}, {model: models.user, attributes: []}]
        }

        return models.device.findAll(params)
    }

    getById(id) {
        let params = {
            where: {id: id},
            attributes: ["id", "name", "mac",
                [models.sequelize.literal('"deviceType".name'), "type"],
                [models.sequelize.literal('"user".name'), "user_name"],
                [models.sequelize.literal('"user".email'), "user_email"]
            ],
            include: [{model: models.deviceType, attributes: []}, {model: models.user, attributes: []}]
        }
        return models.device.findOne(params)
    }

    destroyItem(id) {
        return this.getById(id).then(deviceData => {
            if (!deviceData) {
                throw new Error("Устройство не найдено!")
            }
            return models.device.destroy({where: {id: id}}).then(rowDeleted => {
                    if (rowDeleted === 1) {
                        return Promise.resolve({
                            successful: true,
                            message: "Устройство успешно удалено!",
                            device: deviceData
                        })
                    } else {
                        throw new Error("Не удалось удалить устройство!")
                    }
                }
            )
        })

    }

    createItem(data) {
        if (data.user_email && data.mac && data.type_id && data.name) {
            return models.user.findOne({attributes: ["id"], where: {email: data.user_email}}).then(userData => {
                return models.device.create({
                    userId: userData.id,
                    mac: data.mac,
                    typeId: data.type_id,
                    name: data.name
                }).then(res=> {
                    if (res.id) {
                        return Promise.resolve({
                            successful: true,
                            message: "Устройство успешно создано!",
                            deviceId: res.id
                        })
                    }
                })
            })
        } else {
            throw new Error("Ошибка! Не заполнены обязательные поля!")
        }
    }
}

module.exports = DeviceService