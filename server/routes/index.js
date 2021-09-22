const router = require('express').Router()
const getModules = require('../base/getModules')
getModules(__dirname, (moduleName, moduleBody) => {
    router.use('/' + moduleName,moduleBody)
})
module.exports = router