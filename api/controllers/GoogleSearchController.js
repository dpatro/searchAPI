var request = require('request');


module.exports = {

  blogs: function (req, res) {
  	console.log(req.query.q);
  	request.get(
  		'https://ajax.googleapis.com/ajax/services/search/blogs?v=1.0&q='+req.query.q,
  		function (error, response, body) {
	  		if (!error && response.statusCode == 200) {
	    		res.send(body); // Print the google web page.
	  		}
	  		else {
	  			console.log(error);
	  			console.log(response);
	  			res.error(500);
	  		}
		}
	);
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GoogleSearchController)
   */
  _config: {}

  
};
