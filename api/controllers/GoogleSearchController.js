var https = require('https');


module.exports = {

  blogs: function (req, res) {
  	var apiReqObject = {
		host : 'ajax.googleapis.com',
		port : 443,
		path : '/ajax/services/search/blogs?v=1.0&q='+req.query.q, // the rest of the url with parameters if needed
		method : 'GET' // do GET
	}
	console.log(apiReqObject);

	// do the GET request
	var reqGet = https.request(apiReqObject, function(apiRes) {
		// console.log("statusCode: ", apiRes.statusCode);
		// console.log("headers: ", apiRes.headers);
		
		apiRes.on('data', function(d) {
		    console.log(d);
		});
		res.send(apiRes.headers);
	});

	reqGet.end();
	
	reqGet.on('error', function(e) {
		console.error(e);
	});

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GoogleSearchController)
   */
  _config: {}

  
};
