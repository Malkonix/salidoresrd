const express = require('express')
const moment = require('moment')
const faker = require('faker')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const cors = require('cors')
const logger = require('morgan')
const port = 3000
// const Read = require('./app/middlewares/readgana')

const app = express()
const router = require('./app/routes')

app.use(bodyParser.urlencoded({
    extended: false
})); // Parses urlencoded bodies

app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

if (process.env.NODE_ENV !== "production") {
    app.use(logger('combined')); // Log requests to API using morgan
    // app.use(history());
}

app.get('/', (req, res) => res.json({
    // id: req.id,
    status: 'Working Api'
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

app.listen(port, '0.0.0.0', () => {
    console.log('Server is listening on port ', port)
})
