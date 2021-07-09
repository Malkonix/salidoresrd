const express = require('express')
const moment = require('moment')
const faker = require('faker')
const bodyParser = require('body-parser')
//const logger = require('morgan')
const cors = require('cors')
// const Read = require('./app/middlewares/readgana')

const app = express()
const router = require('./app/routes')

app.use(bodyParser.urlencoded({
    extended: false
})); // Parses urlencoded bodies

app.use(bodyParser.json()); // Send JSON responses
app.use(cors());
//app.use(logger('dev'))

app.get('/', (req, res) => res.json({
    // id: req.id,
    status: 'Working Api',
    "conectate.com.do": "/api/conecta",
    "loteriasdominicanas.com": "/api/lotdom",
    "loterias.do": "/api/loterias",
    haiti: "/api/haiti"
}))

app.get('/gps', (req, res) => {
    res.json({
        // id: req.id,
        sensor: faker.random.word(),
        time: moment(faker.date.recent(800)).local().format().toString(),
        data: [
            faker.address.latitude(),
            faker.address.longitude()
        ]
    })
})

router(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port', process.env.PORT || 3000)
})
