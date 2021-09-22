const router = require('express').Router()
const baseRoute = require('../base/BaseCrud')
const controller = require('../controllers/user')
baseRoute.getBaseRoutes(router, controller)
module.exports = router