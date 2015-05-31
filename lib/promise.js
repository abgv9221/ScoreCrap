var RSVP = require('rsvp');
var request = require('request');
var cheerio = require('cheerio');

var request = function(url){
	return new RSVP.Promise(function(resolve, reject){
		request(url, function(err, response, body){
			if(err)
				reject(err);
			else{
				var $ = cheerio.load(body);
				resolve($);
			}
		});
	});
};

