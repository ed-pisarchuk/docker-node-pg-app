const models = require('../models')
const BaseService = require('../base/BaseService')

class UserService extends BaseService {

    constructor() {
        super();
    }

    getList(data) {
        let params = {
            attributes: ["id", "name"],
            include: [{
                attributes: ["id", "name", "mac"],
                model: models.device,
                required: false
            }]
        }

        return models.deviceType.findAll(params)
    }
}

module.exports = UserService