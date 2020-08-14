const axios = require('axios')
const moment = require('moment')
const x = require('x-ray')({
    filters: {
        trim: (value) => {
            return typeof value === 'string' ? value.trim() : value
        },
        fecha: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD MMM YYYY").local().format().toString() : value
        },
        fecha2: (value) => {
            return typeof value === 'string' ? moment(value.trim(), "DD/MM/YYYY").local().format().toString() : value
        }
    }
})

// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url = 'https://www.leslycenter.com/';

axios({
    method: 'get',
    url: url,
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,es-DO;q=0.8,es;q=0.7",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
        "upgrade-insecure-requests": "1",
        "cookie": "lc_ci_session=e9ec073b923008b0a99d1382af416a2aec5c0037; chat-session=e5720390aa772f206275f1f0e95da285"
    }
})
    .then((response) => {
        let data = response.data
        // console.log(data)
        x(data, 'div.jumbotron.summmary-results',
            x('div.container',
                x('div.row',
                 x('div.col-md-6.col-sm-12.col-xs-12.text-center',
                    [{
                        lotery: x('img.loto@src'),
                        date: x('div.summary-results-block', 'label.date|fecha'),
                        nums: x('div.result', ['span.blue_dark'])
                    }]
                ))
        ))
            .then(resp => {
                console.log(resp)
            })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

// Make a request for a user with a given ID
// axios.get(url)
//     .then(function (response) {
//         // handle success
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
