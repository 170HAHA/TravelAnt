var Yelp = require('yelp');
const config = require('config');
var models = require('../models');

var CONSUMER_KEY = 'tT0sSqLAN4bBb0E6BkPoJg';
var CONSUMER_SECRET = '3MkeN8XxZunhA0nkB393wIdjiL0';
var TOKEN = '-qqprNvqLZY4gwqLlDdg8zE5Wmxn5_bH';
var TOKEN_SECRET = 'VVQrhLdM9tPI8kIkgry1rMxSz9U';

var yelp = new Yelp({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  token: TOKEN,
  token_secret: TOKEN_SECRET
});

module.exports = {};

module.exports.search = function(req,res){
  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: req.body.term, location: req.body.location, category_filter:'active'})
  .then(function (yelpres) {
    console.log("Searched...");
    res.json(yelpres);
    
  })
  .catch(function (err) {
    console.error(err);
  });
}
