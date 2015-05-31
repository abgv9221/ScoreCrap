var express = require('express');
var router = express.Router();
var scrap = require('../lib/promise').get;
var URL = 'http://depor.pe/';

router.get('/', function(req, res, next){
	scrap(URL)
		.then(function($){
			res.send($.html());
		});
});

module.exports = router;