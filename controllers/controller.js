var Search = require('../models/search');
var request = require('request');
var config = require('../config');

exports.HomePage = function(req, res, next) {
	var example = {};
	example.url = req.protocol + '://' + req.get('host') + "/api/imagesearch/cats riding dogs";
	example.paginate = example.url + "?offset=5";
	example.recent = req.protocol + '://' + req.get('host') + "/api/latest/imagesearch/";

	res.render('index', {title: 'Image Search API', example: example});
}

exports.ImageSearch = function(req, res, next) {
	//res.setHeader('Content-Type', 'application/json');

	//Register this search in our database
	Search.create({term: req.params.query, timestamp: Date()}, function(err) {
		if(err) {
			return next(err);
		}
	});

	//Delete oldest entry
	Search.find({}).limit(1).sort({timestamp: 1}).exec(function(err, results) {
		if(err) {
			return next(err);
		}
		Search.deleteOne({_id: results[0]._id}, function(err) {
			if(err) {
				return next(err);
			}
		});
	});

	//Build google search URL
	var url = "https://www.googleapis.com/customsearch/v1?";
	url += "key=" + config.GOOGLE_KEY;
	url += "&cx=" + config.ENGINE_ID;
	url += "&q=" + req.params.query;
	if(req.query.offset) {
		url += "&start=" + parseInt(req.query.offset);
	}
	url += "&searchType=image";

	request(url, function(err, response, body) {
		if(err) {
			return next(err);
		}

		//Parse through the response and grab the stuff we need
		var jsonBody = JSON.parse(body);
		var data = [];
		var result = {};
		var i = 0;
		while(i < 10) {
			result = new Object();
			result.url = jsonBody.items[i].link;
			result.snippet = jsonBody.items[i].snippet;
			result.context = jsonBody.items[i].image.contextLink;
			data.push(result);
			i++;
		}

		res.render("results", {title: "Search Results!", data: data});
	});
}

exports.Latest = function(req, res, next) {
	var query = Search.find({});
	query.select('term timestamp');
	query.limit(10);
	query.sort({ timestamp: -1});
	query.exec(function(err, results) {
		if (err) {
			return(next(err));
		}

		res.render("list", {title: "Recent Searches", data: results});
		return;
	});
}