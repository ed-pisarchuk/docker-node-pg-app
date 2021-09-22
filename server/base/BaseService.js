const {Op} = require('sequelize')

class BaseService {
    createItem(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    updateItem(id, data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    destroyItem(id) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    getById(id) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    getList(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    countItems(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    getAuthUser(auth) {
        return (auth.user && auth.user.id) ? auth.user : null
    }

    prepareOutData(result) {
        return result.then(res => {
            let resultData = {}
            if (res.count !== undefined) {
                resultData.totalCount = res.count
                delete res.count
            }
            if (res.rows !== undefined) {
                resultData.data = res.rows
                delete res.rows
            } else {
                resultData.data = res
            }
            return Promise.resolve(resultData)
        })
    }

    parseFilter(filterItems){
        function operAdapt(operName, value) {
            const opers = {
                '=': value => {
                    return {[Op.eq]: value}
                },
                'contains': value => {
                    return {[Op.iLike]: value + '%'}
                },
                '>=': value => {
                    return {[Op.gte]: value}
                },
                '<=': value => {
                    return {[Op.lte]: value}
                },
                '<': value => {
                    return {[Op.lt]: value}
                },
                '>': value => {
                    return {[Op.gt]: value}
                },
                'and': value => {
                    return [[Op.and], value]
                },
                'or': value => {
                    return {[Op.or]: value}
                },
                'in': value => {
                    return {[Op.in]: value.split(',')}
                }
            }
            return opers[operName](value)
        }

        function isSimpleItem(item) {
            return (Array.isArray(item) && item.length === 3 && !Array.isArray(item[0]) && !Array.isArray(item[1]) && !Array.isArray(item[2]))
        }

        function* getMainOper(items) {
            for (let item in items) {
                if (item % 2 !== 0) {
                    yield items[item]
                }
            }
        }

        function parse(params, spool = {}, level = 1) {
            if (!isSimpleItem(params)) {
                const mainOper = new Set(getMainOper(params))
                if (mainOper.size !== 1) {
                    return Promise.reject(new Error("Invalid filter! Incorrect 'AND'/'OR' condition!"))
                } else {
                    let cond
                    let obj

                    switch (Array.from(mainOper)[0]) {
                        case 'and':
                            cond = Op.and
                            break
                        case 'or':
                            cond = Op.or
                    }
                    if (level > 1) {
                        spool.push({[cond]: []})
                        obj = spool[spool.length -1][cond]
                    } else {
                        spool[cond] = []
                        obj = spool[cond]
                    }

                    for (let item in params) {
                        if (item % 2 === 0) {
                            parse(params[item], obj, ++level)
                        }
                    }
                }
            } else {
                if (level > 1) {
                    spool.push({[params[0]]: operAdapt(params[1], params[2])})
                } else {
                    spool[params[0]] = operAdapt(params[1], params[2])
                }
            }
        }

        let spool = {}
        parse(filterItems, spool)

        return spool
    }

}

module.exports = BaseService