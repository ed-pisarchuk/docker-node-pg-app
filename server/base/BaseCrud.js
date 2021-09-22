const BaseController = require('./BaseController')
/**
 * Класс реализующий базовый набор методов REST full
 */
class BaseCrud {

    static getBaseRoutes(router, controller) {
        if (!(controller instanceof BaseController)){
            throw new Error("Controller instance not BaseController class in " + this.name)
        }
        router.get('/', (req, res, next) => controller.index(req, res, next)
        ).post('/', (req, res, next) => controller.store(req, res, next)
        ).get('/count', (req, res, next) => controller.count(req, res, next)
        ).get('/:id', (req, res, next) => controller.show(req, res, next)
        ).put('/:id', (req, res, next) => controller.update(req, res, next)
        ).delete('/:id', (req, res, next) => controller.destroy(req, res, next))
    }
}

module.exports = BaseCrud