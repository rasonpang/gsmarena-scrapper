const GSMArenaScrapper = require('./scrap');

const { argv } = require('process');
const url = argv.splice(2)[0];

GSMArenaScrapper(url);