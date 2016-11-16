const agent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

function handleResponse(error, result) {
    if (error) {
        return console.error(error);
    }
    console.log(result);
}

function getReport(callback) {
    agent
        .get('http://www.accuweather.com/en/gb/london/ec4a-2/astronomy-hourly-forecast/328328')
        .end((error, response) => {
            if (error) { return callback(error); }
            const $ = cheerio.load(response.text);
            const report = [];
            $('.panel-list.lifestyle-panel.five-panel > ul > li').map((index, element) => {
                const day = $(element).find('h3').text();
                const temp = $(element).find('.temp').text().replace(/\s/g, '');
                const cond = $(element).find('.cond').text();
                const stargazing = $(element).find('.indicies .title-set').text().replace(/\s\s+/g, ' ').trim();
                const cover = $(element).find('.indicies ul:nth-child(2) li:nth-child(1)').text().replace(/\s\s+/g, ' ').trim();
                const precip = $(element).find('.indicies ul:nth-child(2) li:nth-child(2)').text().replace(/\s\s+/g, ' ').trim();
                report.push({
                    day,
                    temp,
                    cond,
                    stargazing,
                    cover,
                    precip
                });
            });
            callback(false, report);
        });
}

async.retry(3, getReport, (error, report) => {
    if (error) { return handleResponse(error); }
    handleResponse(null, report);
});
