/*
 * GET home page.
 */
//var data = require("../data.json");
var models = require("../models");

exports.planInfo = function(req, res){
    var tripID = req.params.tripID;
    
    console.log("tripID: " + tripID);
    
    models.Trip
    .find({_id: tripID})
    .populate('_activityList _participants')
    .exec(function(err, trip){
        
        res.render('plan', {data: trip[0]});
    });
    
};
