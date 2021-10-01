const ApiError = require('../errors/ApiError')
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
                [models.sequelize.literal('"user".name'), "owner_name"],
                [models.sequelize.literal('"user".email'), "owner_email"]
            ],
            include: [{model: models.deviceType, attributes: []}, {model: models.user, attributes: []}]
        }

        return models.device.findAll(params)
    }

    updateItem(id, data) {
        const updatedFields = ["mac", "type_id", "name"]
        let onChange = {}
        for (let item of updatedFields) {
            if (data[item]) onChange[item] = data[item]
        }

        return models.device.update(onChange, {where: {id: id}, limit: 1}).then(async rowUpdated => {
            if (rowUpdated[0] === 1) {
                const device = await this.getById(id)
                return Promise.resolve({
                    successful: true,
                    message: "Устройство успешно изменено!",
                    device: device
                })
            } else {
                return Promise.reject(new Error("Не удалось изменить устройство!"))
            }
        })
    }

    getById(id) {
        let params = {
            where: {id: id},
            attributes: ["id", "name", "mac",
                [models.sequelize.literal('"deviceType".name'), "type"],
                [models.sequelize.literal('"user".name'), "owner_name"],
                [models.sequelize.literal('"user".email'), "owner_email"]
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
                        return Promise.reject( new Error("Не удалось удалить устройство!"))
                    }
                }
            )
        })

    }

    createItem(data) {
        const requiredFields = ["user_email", "mac", "type_id", "name"]
        const blankFields = requiredFields.filter(item => {
            if (!data[item]) {
                return item
            }
        })
        if (!blankFields.length) {
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
            return Promise.reject(blankFields.map(item => new ApiError(400, `Не заполнено обязательное поле ${item}!`, "form_data",
                {
                    field: item,
                    required: true
                }
            )))
        }
    }
}

module.exports = DeviceService