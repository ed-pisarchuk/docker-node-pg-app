class BaseController {
    service

    setService(service) {
        this.service = service
    }

    prepareResults(result, res) {
        result.then(results => {
            res.json(results)
        }).catch(err => {
            if (process.env.ERROR_LOGGING !== "false") {
                console.error(new Date(), err)
            }
            res.error(err instanceof Array ? err.map(item => item.valueOf()) : err.valueOf())
        })
    }

    show(req, res, next) {
        this.prepareResults(this.service.getById(req.params.id, req.query, req.user), res)
    }

    index(req, res, next) {
        this.prepareResults(this.service.getList(req.query, req.user), res)
    }

    store(req, res, next) {
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