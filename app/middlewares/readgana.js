const moment = require('moment')
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

exports.readConecta = async () => {
    return await x('https://www.conectate.com.do/loterias/', 'div.game-block', [{
        loteria: x('a.game-title', 'span@i.fas|trim'),
        numeros: x('div.game-scores', [
            'span.score|trim'
        ]),
        fecha: 'span.session-date|trim'
    }])
        .then((response) => {
            return response
        })
        .catch(err => {
            throw err
        })
}

exports.readLotDom = async () => {
    return await x('https://loteriasdominicanas.com/', 'div.game-block', [{
        loteria: x('a.game-title', 'span@i.fas|trim'),
        numeros: x('div.game-scores', [
            'span.score|trim'
        ]),
        fecha: 'span.session-date|trim'
    }])
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        })
}

exports.readLoteria = async () => {
    return await x('https://loterias.do', 'div.su-row', [{
        title: 'h3',
        numbers: x('p', [
            'span.lot-number|trim'
        ]),
        fecha: x('div.fecha-sorteo', 'span')
    }])
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        })
}
