var express = require('express');
var router = express.Router();
var scrap = require('../lib/promise').get;
var URL = 'http://www.resultados-futbol.com/';

router.get('/', function(req, res, next){
	scrap(URL)
		.then(function($){
			var a = []
			$("div.liga>table>tbody>tr").each(function(i, element){
				var goles = $(this).find('a>div.clase').text().split('-');
				var json = {
					fecha: $(this).html(),
					hora: $(this).find('span.fecha-status').html(),
					estado: $(this).find('span.fecha-status.live').html(),
					equipol: {
						nombre: $(this).find('span.padr>a').html(),
						imagen: $(this).find('span.padr>img').attr('src'),
						goles: goles[0]
					},
					equipor: {
						nombre: $(this).find('span.padl>a').html(),
						imagen: $(this).find('span.padl>img').attr('src'),
						goles: goles[1]
					}
				}
				if(json.hora){
					a.push(json);
				}		
			});
			res.send(a)
		});
});

module.exports = router;