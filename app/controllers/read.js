const readgana = require('../middlewares/readgana')

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

exports.readHaiti = async (req, res) => {
    readgana.readHaiti()
        .then( haiti => {
            res.json(haiti)
        })
}
