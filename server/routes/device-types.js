const router = require('express').Router()
const baseRoute = require('../base/BaseCrud')
const controller = require('../controllers/deviceTypes')
baseRoute.getBaseRoutes(router, controller)
module.exports = router