var express = require('express');
var router = express.Router();
var scrap = require('scrap');
var URL = 'http://depor.pe/';

router.get('/', function(req, res, next){
	scrap(URL, function(err, $){
		res.send($.html());
	});
});

module.exports = router;