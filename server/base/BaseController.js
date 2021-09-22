class BaseController {
    service
    defaultErrorFields = ['code', 'message', 'description']

    setService(service) {
        this.service = service
    }

    prepareResults(result, res) {
        result.then(results => {
            res.json(results)
        }).catch(err => {
            console.error(new Date(), err)
            console.log(this.resultError(err))
            res.error(this.resultError(err))
        })
    }

    resultError(error, fields) {
        fields = fields || this.defaultErrorFields
        let errorObject = {}
        fields.forEach(function (item) {
            switch (item) {
                case 'code':
                    errorObject[item] = error[item] || 400
                    break
                case 'message':
                    errorObject.title = error[item] || null
                    break
                default:
                    errorObject[item] = error[item] || null
                    break
            }
        })
        return errorObject
    }

    show(req, res, next) {
        this.prepareResults(this.service.getById(req.params.id, req.query, req.user), res)
    }

    index(req, res, next) {
        this.prepareResults(this.service.getList(req.query, req.user), res)
    }

    store(req, res, next) {
        console.log(req)
        this.prepareResults(this.service.createItem(req.body, req.user), res)
    }

    update(req, res, next) {
        this.prepareResults(this.service.updateItem(req.params.id, req.body, req.user), res)
    }

    destroy(req, res, next) {
        this.prepareResults(this.service.destroyItem(req.params.id, req.user), res)
    }

    count(req, res, next) {
        this.prepareResults(this.service.countItems(req.query, req.user), res)
    }
}

module.exports = BaseController