const models = require('../models')
const BaseService = require('../base/BaseService')

class UserService extends BaseService {

    constructor() {
        super();
    }

    getList(data) {
        let params = {
            attributes: ["email", "name"],
            include: [{
                model: models.device,
                attributes: ["name", "mac", [models.sequelize.literal('"devices->deviceType".name'), "type"]],
                include: [
                    {
                        model: models.deviceType,
                        attributes: []
                    }]
            }]
        }

        return models.user.findAll(params)
    }

    getById(id) {
        let params = {
            where: {id: id},
            attributes: ["email", "name"],
            include: [{
                model: models.device,
                attributes: ["name", "mac", [models.sequelize.literal('"devices->deviceType".name'), "type"]],
                include: [
                    {
                        model: models.deviceType,
                        attributes: []
                    }]
            }]
        }

        return models.user.findOne(params)
    }
}

module.exports = UserService