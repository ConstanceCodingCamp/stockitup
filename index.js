require("dotenv").config();
const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const path = require("path");
const request = require("request");
const API_KEY = process.env.API_KEY;
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs({
	defaultLayout:'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static("images"));

app.use(express.static(path.join(__dirname, 'public', 'views')));

app.use(bodyParser.urlencoded({extended:false}));

function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=' + API_KEY, { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
			finishedAPI(body);
		};
	});
};

app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "upwk");

});

app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);

});

app.get('/black-owned.html', function (req, res) {
    res.render('black-owned');
});

app.listen(PORT, () => console.log("I got next!"));
