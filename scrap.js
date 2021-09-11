const https = require('https');

let options = {
	host: 'jaidefinichon.com',
	port: 443,
	path: '/page/',
};

const regex = /(https:\/\/jaidefinichon\.com\/wp-content\/uploads\/\d{4}\/\d{2}\/)/g;

let links = [];

function getImage() {
	if (links.length === 0) loadMoreLinks();
	return links.pop();
}

function loadMoreLinks(page) {
	const n = (page) ? page : 1;
	options.path = '/page/' + n + '/';

	https.get(options, function(res) {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});

		res.on('end', () => {
			links = data.match(regex);
		});
	}).on('error', function (e) {
		console.log('Got error: ' + e.message);
	});
}

getImage();
