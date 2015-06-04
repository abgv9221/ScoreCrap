var express = require('express');
var router = express.Router();
var scrap = require('../lib/promise').get;
var URL = 'http://www.resultados-futbol.com/';

router.get('/', function(req, res, next){
	scrap(URL)
		.then(function($){
			var a = []
			$("div.listaligas").each(function(i, element){
				$(this).find('div.liga').each(function(i, element){
					var json = {};
					var partidos = [];
					json.liga = $(this).find('div.title>a').text();
					$(this).find("table>tbody>tr").each(function(i, element){
						var datos = $(this).find('a>div.clase').text().split('-');
						var postergado;
						var goles = [];
						(datos[0].search(':') != -1)?postergado = datos[0]:goles = datos;
						var temporal = {
							fecha: $(this).find('td:first-child').text().substring(0,10),
							hora: $(this).find('span.fecha-status').html(),
							postergado: postergado,
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
						if(temporal.hora){
							partidos.push(temporal);
						}		
					});
					json.partidos = partidos;
					a.push(json);
				});
			});
			res.send(a);
		});
});

module.exports = router;