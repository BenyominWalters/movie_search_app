const express = require('express');
const app = express();
const request = require('request');
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('search');
});

app.get('/results', (req, res) => {
	const query = req.query.search;
	request(`http://www.omdbapi.com/?s=${query}&apikey=thewdb`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			res.render('results', { data: data });
		}
	});
});

app.get('/search', (req, res) => {
	res.send('Search page');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
