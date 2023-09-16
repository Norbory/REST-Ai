const controllerCompany = require('../controller/company/controller.company')
const controllerIncident = require('../controller/incident/controller.incident')
const controllerArea = require('../controller/area/controller.area')
const controllerJetson = require('../controller/jetson/controller.jetson')
const controllerUser = require('../controller/user/controller.user')


const router = (app) => {
  app.use('/company', controllerCompany)
  app.use('/company', controllerIncident)
  app.use('/company', controllerArea)
  app.use('/company', controllerJetson)
  app.use('/company', controllerUser)
}

module.exports = router