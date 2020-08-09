const express = require('express')

const readController = require('./controllers/read')

module.exports = (app) => {
    const apiRoutes = express.Router()
    const readRoutes = express.Router()

    apiRoutes.use('/', readRoutes)
    readRoutes.get('/conecta', readController.readCone)
    readRoutes.get('/loterias', readController.readLoter)
    readRoutes.get('/lotdom', readController.readLDom)

    app.use('/api', apiRoutes)
}
