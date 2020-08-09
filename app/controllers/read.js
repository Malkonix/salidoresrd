const moment = require('moment')
const readgana = require('../middlewares/readgana')
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
    readgana.readConecta()
        .then( conecta => {
            res.json(conecta)
        })
}

exports.readLDom = async (req, res) => {
    readgana.readLotDom()
        .then( lotDom => {
            res.json(lotDom)
        })
}

exports.readLoter = async (req, res) => {
    readgana.readConecta()
        .then( conecta => {
            res.json(conecta)
        })
}
