/*
 * GET home page.
 */
//var data = require("../data.json");
var models = require("../models");
    
//var dataFinished = require("../dataFinished.json");



exports.view = function(req, res){
    console.log("Index session.user:", req.session.user);
    var userID = req.session.user._id;
    console.log("USer Id: ", userID);
    
    var nowTime = new Date();
    
    
    models.User
    .find({_id: userID})
    .populate({
        path: '_trips',
        match: {voteDue: {$lt: nowTime}}
    })
    .exec(function(err, usr){
        if (err) return res.send(500);
        models.Trip.populate(usr[0]._trips, {path: '_participants'}, function(err, trip1){
            console.log("finished trips:" + trip1);
            var finished_trip = trip1;
            models.User
            .find({_id: userID})
            .populate({
                path: '_trips',
                match: {voteDue: {$gte: nowTime}}
            })
            .exec(function(err, usr2){
                if (err) return res.send(500);
                models.Trip.populate(usr2[0]._trips, {path: '_participants'}, function(err, trip2){
                    console.log("unfinished trips:" + trip2);
                    var unfinished_trip = trip2;
                    console.log(unfinished_trip[0].voteDue.toDateString());
                    console.log(finished_trip[0].voteDue.toDateString());
                    res.render('index', {'finishedTrip': unfinished_trip, 'unfinishedTrip': finished_trip});
                });
                
            });                                                                   
                                                                          
                                                                                
        });
        
        
    });
    
};
