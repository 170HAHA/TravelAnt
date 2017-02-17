/*
 * GET home page.
 */
var data = require("../myfriends.json");

exports.view = function(req, res){
  res.render('myfriends', {'Friends': data});
};
