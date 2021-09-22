const fs = require('fs')
const path = require('path')
module.exports = (dirName, cb) => {
    const basename = 'index.js'
    fs.readdirSync(dirName)
        .filter(item => {
            return (item.indexOf('.') !== 0) && (item !== basename)
        })
        .forEach(item => {
            const itemBody = require(path.join(dirName, item))
            let pathName = fs.lstatSync(path.join(dirName, item)).isDirectory() ? item : item.replace('.js', '')
            cb(pathName, itemBody)
        })
}