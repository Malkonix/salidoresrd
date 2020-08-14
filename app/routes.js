const express = require('express')

const readController = require('./controllers/read')

module.exports = (app) => {
    const apiRoutes = express.Router()
    const readRoutes = express.Router()

    apiRoutes.use('/', readRoutes)
    readRoutes.get('/conecta', readController.readCone)
    readRoutes.get('/loterias', readController.readLoter)
    readRoutes.get('/lotdom', readController.readLDom)
    readRoutes.get('/haiti', readController.readHaiti)
    // readRoutes.get('/haiti2', readController.readHaiti2)

    app.use('/api', apiRoutes)
}
