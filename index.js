const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async (_url) => {
	const res = await axios(_url).catch(err => console.log(err));

	if (res.status != 200) {
		console.log('Status not 200: ', res);
		return;
	}

	return res;
}

const crawlData = (res) => {
	let result = {};
	if (res?.data) {
		const $ = cheerio.load(res.data);
		const specList = $('#specs-list > table > tbody');
		specList.each((_, { children: [ target ] }) => {
			const part = $(target).find('th').text();
			const title = $(target).find('.ttl').text();
			const info = $(target).find('.nfo').text();
			
			Object.assign(result, {
				[part]: {
					[title]: info
				}
			})
		})
	}
	console.log('result --->', result);
}

const { argv } = require('process');
const url = argv.splice(2)[0];

if (!!url) fetchData(url).then(crawlData);
else console.log('Please enter a link')