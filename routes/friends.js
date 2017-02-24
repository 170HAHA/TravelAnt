/*
 * GET home page.
 */
var models = require("../models");
//var data = require("../myfriends.json");

exports.view = function(req, res){

    var userID = req.session.user._id;
    //console.log("USer Id: ", userID);
    
    models.User.find({_id: userID})
    .populate({
        path: '_friends'
    })
    .exec(function(err, usr){
        if (err) return res.send(500);
        //console.log(usr[0]._friends);
        res.render('myfriends', {'Friends':usr[0]._friends});
    });
};
