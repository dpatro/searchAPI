var request = require('request');
var async = require('async');


function GoogleApiCall(media, q, callback){
	request.get(
		'https://ajax.googleapis.com/ajax/services/search/'+media+'?v=1.0&rsz=8&q='+q,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callback(null, JSON.parse(body));
			}
			else {
				callback({error: error, response: response}, null);
			}
		}
	);
};


module.exports = {

	blogs: function (req, res) {

		var custCallback = function (err, apiRes){
			if (err){
				console.log(err);
				res.error(err);
			}
			else{
				sails.log.debug(apiRes.responseData.cursor);

				var results = apiRes.responseData.results;
				var resToSend = results.map(function (result){
					return {
						title: result.titleNoFormatting,
						snippet: result.content,
						url: result.postUrl
					};
				});
				res.send(resToSend);
			}
		};

		if (req.query.q && req.query.q.length){
			GoogleApiCall('blogs', req.query.q, custCallback);
		}
		else{
			res.error(400);
		}
	},

	images: function (req, res) {
		var custCallback = function (err, apiRes){
			if (err){
				console.log(err);
				res.error(err);
			}
			else{
				var results = apiRes.responseData.results;
				var resToSend = results.map(function (result){
					return result
				});
				res.send(resToSend);
			}
		};

		if (req.query.q && req.query.q.length){
			GoogleApiCall('images', req.query.q, custCallback);
		}
		else{
			res.error(400);
		}
	},

	news: function (req, res) {
		var custCallback = function (err, apiRes){
			if (err){
				console.log(err);
				res.error(err);
			}
			else{
				var results = apiRes.responseData.results;
				var resToSend = results.map(function (result){
					return result
				});
				res.send(resToSend);
			}
		};

		if (req.query.q && req.query.q.length){
			GoogleApiCall('news', req.query.q, custCallback);
		}
		else{
			res.error(400);
		}
	},

	videos: function (req, res) {
		var custCallback = function (err, apiRes){
			if (err){
				console.log(err);
				res.error(err);
			}
			else{
				var results = apiRes.responseData.results;
				var resToSend = results.map(function (result){
					return result
				});
				res.send(resToSend);
			}
		};

		if (req.query.q && req.query.q.length){
			GoogleApiCall('video', req.query.q, custCallback);
		}
		else{
			res.error(400);
		}
	},


	all: function (req, res){
		if (req.query.q && req.query.q.length){

			async.map(
				['news', 'blogs', 'images', 'video'],
				function (media, callback){
					var custCallback = function (err, apiRes){
						if (err){
							console.log(err);
							callback(err);
						}
						else{
							var results = apiRes.responseData.results;
							var resToSend = results.map(function (result){
								return result
							});
							callback(null, {type: media, res: resToSend});
						}
					};
					
					GoogleApiCall(media, req.query.q, custCallback);
				},
				function (err, results){
					if (err){
						res.error(err);
					}
					else {
						res.json(results);
					}
				}
			)
		}
		else{
			res.error(400);
		}	
	},


	/**
	* Overrides for the settings in `config/controllers.js`
	* (specific to GoogleSearchController)
	*/
	_config: {}


};
