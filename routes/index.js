/*
 * GET home page.
 */
//var data = require("../data.json");
var trips = require("../trip.json");
var dataFinished = require("../dataFinished.json");
exports.view = function(req, res){
  res.render('index', {'Routesdata': data, 'RoutesdataFinished': dataFinished});
};
