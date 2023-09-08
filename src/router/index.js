const controllerTelegram = require('../telegram/controller.telegram')
const controllerWeb = require('../web/controller.web')
const controllerMobile = require('../mobile/controller.mobile')

const router = (app) => {
  app.use('/telegram', controllerTelegram)
  app.use('/web', controllerWeb)
  app.use('/mobile', controllerMobile)
}

module.exports = router