const https = require('https');

const options = {
	host: 'jaidefinichon.com',
	port: 443,
	path: '/page/',
};

const regex = /(https:\/\/jaidefinichon\.com\/wp-content\/uploads\/\d{4}\/\d{2}\/[A-Za-z0-9_-]+\.((jpg)|(png)))/g;

let links = [];

const getMeme = () => {
	const url = links.pop();
	if (links.length === 0) {
		loadMoreLinks();
	}
	return url;
};

const loadMoreLinks = (page) => {
	const n = (page) ? page : Math.floor(Math.random() * (3000 - 2)) + 2;
	options.path = '/page/' + n + '/';

	https.get(options, function(res) {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});

		res.on('end', () => {
			links = data.match(regex);
			links.pop();
		});
	}).on('error', function(e) {
		console.log('Got error: ' + e.message);
	});
};

module.exports = { getMeme, loadMoreLinks } ;
