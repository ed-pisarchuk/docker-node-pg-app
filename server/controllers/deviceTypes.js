const BaseController = require('../base/BaseController')
const Service =  require('../services/deviceTypes')
const controller = new BaseController()
const service = new Service()
controller.setService(service)
module.exports = controller