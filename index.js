require("dotenv").config();
const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const API_KEY = process.env.API_KEY
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));

function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=' + API_KEY, { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
			finishedAPI(body);
		};
	});
};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "jpm");

});

app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);

});

app.get('/about.html', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log("I got next!"));
