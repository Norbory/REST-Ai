const controllercompany = require('../controller/company/controller.company')
const controllerincident = require('../controller/incident/controller.incident')


const router = (app) => {
  app.use('/company', controllercompany)
  app.use('/company', controllerincident)

}

module.exports = router