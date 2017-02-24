
var models = require("../models");

exports.add = function(req, res){
    var activityImg = req.body.activityImg;
    var activityName = req.body.activityName;
    var yelpUrl = req.body.yelpUrl;
    var activityVotes = '0';
    var tripID = req.body.tripID;
    var activityComments = req.body.activityComments;
    
    var newActivity = new models.Activity();
    newActivity.activityImg = activityImg;
    newActivity.activityName = activityName;
    newActivity.activityVotes = activityVotes;
    newActivity.yelpUrl = yelpUrl;
    newActivity.activityComments = activityComments;

    
    models.Trip.findOneAndUpdate({_id: tripID}, {$push: {_activityList: newActivity}}, function(err,r){
                if (err)  return res.send(100);
                console.log(r);
            });

    console.log("newActivity"+newActivity);
    
    newActivity.save(function(err){
    		console.log("aaaaa"+tripID);
	        var to = '/plan/'+tripID;
	        res.redirect(to);
    
        });
    
    
};
