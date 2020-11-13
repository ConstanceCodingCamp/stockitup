const request = require("request");

function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=' + API_KEY, { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
			finishedAPI(body);
		};
	});
};
exports.call_api = call_api;
