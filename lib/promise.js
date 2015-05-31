var Q = require('q');
var scrap = require('scrap');

var get = function(url){
	var deferred = Q.defer();
	scrap(url, function(err, $){
		err?deferred.reject(err):deferred.resolve($);
	});
	return deferred.promise;
};

module.exports = {
	get: get
}
