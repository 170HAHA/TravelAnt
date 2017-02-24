/*
 * GET home page.
 */
//var data = require("../data.json");
var models = require("../models");

exports.planInfo = function(req, res){
    var userID = req.session.user._id;
    var tripID = req.params.tripID;
    
    console.log("tripID: " + tripID);
    
// <<<<<<< HEAD
//     models.Trip
//     .find({_id: tripID})
//     .populate('_activityList _participants')
//     .exec(function(err, trip){
        
//         res.render('plan', {data: trip[0]});
// =======
    models.User
    .find({_id: userID})
    .exec(function(err, user){
        var votedActivities = user[0].voted;
        
        models.Trip
        .find({_id: tripID})
        .populate('_activityList _participants')
        .exec(function(err, trip){
            console.log("Plan: " + trip[0]);
            
            var nowTime = new Date();
            var unfinished = true;
            if (trip[0].voteDue < nowTime){
                unfinished = false;
            }
            
            trip[0].unfinished = unfinished;

            var activityList = trip[0]._activityList;

            for (var i = 0; i < activityList.length; ++i){
                if (votedActivities.indexOf(activityList[i]._id) == -1){
                    activityList[i].voted = false;
                }else{
                    activityList[i].voted = true;
                }
            }

            console.log("Activity: " + activityList);

            function compare(a, b){
                return b.activityVotes - a.activityVotes;
            }

            activityList.sort(compare);
            
            var hasActivity = true;
            if (activityList.length == 0)
                hasActivity = false;
            
            console.log(hasActivity);

            res.render('plan', {trip: trip[0], unfinished: unfinished, hasActivity: hasActivity,  activities: activityList, user: {userName: user[0].userName, userImg: user[0].imgURL}});
        });
        
    });
    
    
    
};


exports.voteUpdate = function(req, res){
    var activityID = req.query.activityID;
    var voteNum = req.query.voteNum;
    var userID = req.session.user._id;
    
    
    models.Activity
    .findOneAndUpdate({_id: activityID}, {$set: {activityVotes: voteNum}}, function(err, r){
        if (err)    return res.send(500);
        console.log("Updated activity:" + r);
        
        models.User
        .find({_id: userID})
        .exec(function(err, user){
            var voted = user[0].voted;
            var index = voted.indexOf(activityID);
            if (index == -1){
                voted.push(activityID);
            }else{
                voted.splice(index, 1);
            }
            
            models.User
            .findOneAndUpdate({_id: userID}, {$set: {voted: voted}}, function(err, r){
                if (err)    return res.send(500);
            });
            
        });
        
    });
    
};
