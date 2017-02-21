var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  token: 'token',
  token_secret: 'token-secret',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});