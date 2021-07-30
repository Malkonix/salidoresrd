const moment = require('moment')
const axios = require('axios')
const path = require('path')

const x = require('x-ray')({
    filters: {
        trim: (value) => {
            return typeof value === 'string' ? value.trim() : value
        },
        fecha: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD-MM-YYYY").local().format() : value
        },
        fecha2: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD/MM/YYYY").local().format() : value
        },
        fecha3: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD MMM YYYY").local().format() : value
        },
        bname: (value) => {
            return typeof value === 'string' ? path.basename(value, '.jpg') : value
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
        fecha: x('div.fecha-sorteo', 'span|fecha2')
    }])
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        })
}

exports.readHaiti = async () => {
    return await axios({
        method: 'get',
        url: 'https://www.leslycenter.com',
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
            "upgrade-insecure-requests": "1" ,
            "cookie": "lc_ci_session=e9ec073b923008b0a99d1382af416a2aec5c0037; chat-session=e5720390aa772f206275f1f0e95da285"
        }
    })
        .then(async (response) => {
            let data = response.data
            //console.log(data)
            return await x(data, 'div.jumbotron.summary-results',
                x('div.container',
                    x('div.row',
                     x('div.col-md-6.col-sm-12.col-xs-12.text-center',
                        [{
                            lotery: x('img.loto@src|bname'),
                            date: x('div.summary-results-block', 'label.date|trim'),
                            nums: x('div.result', ['span.blue_dark'])
                        }]
                    ))
            ))
                .then(resp => {
                    // console.log(resp)
                    return resp
                })
        })
        .catch(function (error) {
            // handle error
            // console.log(error)
            return error
        })
}
