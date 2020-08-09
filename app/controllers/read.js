const moment = require('moment')
const readgana = require('../middlewares/readgana')
const url = require('url').parse
const x = require('x-ray')({
    filters: {
        trim: (value) => {
            return typeof value === 'string' ? value.trim() : value
        },
        fecha: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD-MM-YYYY").local().format().toString() : value
        },
        fecha2: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD/MM/YYYY").local().format().toString() : value
        }
    }
})

exports.readCone = (req, res) => {
    let date = url(req.url, true).query
    console.log('Date: ', date)

    readgana.readConecta()
        .then( conecta => {
            res.json(conecta)
        })

}

exports.readLDom = async (req, res) => {
    let date = url(req.url, true).query
    console.log('Date: ', date)

    readgana.readLotDom()
        .then( lotDom => {
            res.json(lotDom)
        })
}

exports.readLoter = async (req, res) => {
    let date = url(req.url, true).query
    console.log('Date: ', date)

    readgana.readConecta()
        .then( conecta => {
            res.json(conecta)
        })
}
