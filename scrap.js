const axios = require('axios');
const cheerio = require('cheerio');

const GSMArenaScrapper = (url) => {
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
		let latestKey = '';
	
		if (res?.data) {
			const $ = cheerio.load(res.data);
			const specList = $('#specs-list > table > tbody');
			specList.each((_, tbody) => {
				const part = $(tbody).find('th').text();
	
				$(tbody).find('.ttl').each((_, ttl) => {
					const title = $(ttl).text().trim() != '' ? $(ttl).text() : latestKey;
					latestKey = title;
					const value = $(ttl).siblings('.nfo').text();
					
					if (!result[part]) result[part] = {};
	
					Object.assign(result[part], {
						[title]: value
					});
				});
			});
	
			console.log(result);
		}
	}

	if (!!url) fetchData(url).then(crawlData);
	else console.log('Please enter a link')
};

module.exports = GSMArenaScrapper;