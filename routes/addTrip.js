//var data = require("../data.json");
//var dataFinished = require("../dataFinished.json");
var path = require('path');
var models = require('../models');
//var myFriends = require("../myfriends.json");

exports.view = function(req, res) {
    var userID = req.session.user._id;
    console.log("userID" + userID);
    
    models.User
    .find({_id: userID})
    .populate('_friends')
    .exec(function(err, user){
        console.log(user[0]);
        
        var friends = [];
        for (var i = 0; i < user[0]._friends.length; ++i){
            console.log(user[0]._friends[i].userName);
            friends.push({"Name": user[0]._friends[i].userName});
        }
        console.log(friends);
        //console.log(myFriends);
        res.render('addTrip', {"myFriends": friends, user: {userName: user[0].userName, userImg: user[0].imgURL}});
    });
    
    //res.render('addTrip', {});
    //res.sendFile(path.join(__dirname+ '../views/addTrip.html' ));
    //console.log("__dirname");
}

exports.add = function(req, res) {  
    var curUserID = req.session.user._id;
    
    console.log("Added trip: " + req.query.tripName);
    
    var tripName = req.query.tripName;
    var location = req.query.destination;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var selectedFriends = req.query.selectedFriends.split(","); 
    var dueDate = req.query.dueDate;
    
    if (dueDate == ""){
       dueDate = startDate;
    }
    
    var newTrip = new models.Trip();
    newTrip.tripName = tripName;
    newTrip.tripLocation = location;
    newTrip.tripStartDate = startDate;
    newTrip.tripEndDate = endDate;
    newTrip.voteDue = dueDate;
    
    models.User.find({userName: {$in: selectedFriends}}, function(err, users){
        var userIDs = [];
        for (var i = 0; i < users.length; ++i){
            userIDs.push(users[i]._id);
        }
        userIDs.push(curUserID);
        
        console.log("Users: " + userIDs);
        
        for (var i = 0; i < userIDs.length; ++i){
            newTrip._participants.push(userIDs[i]);
        }
        
        console.log("New Trip: " + newTrip);
        
        for (var i = 0; i < userIDs.length; ++i){
            models.User.findOneAndUpdate({_id: userIDs[i]}, {$push: {_trips: newTrip._id}}, function(err,r){
                if (err)    return res.send(500);
                console.log(r);
            });
        }
        
                                     
        newTrip.save(function(err){
            
            res.redirect("/index");
    
        });
    });
    
    /*var newTrip = {
                "tripName" : tripName,
                "tripLocation":  location,
                "tripStartDate": startDate,
                "tripEndDate" : endDate,
                "voteDue": dueDate,
                "participants": selectedFriends
			}
    */
	//data.push(newTrip);
	//console.log(data);
    //res.render('index', {'Routesdata': data, 'RoutesdataFinished': dataFinished});
};


exports.editview = function(req, res){
    /*
    var userID = req.session.user._id;
    console.log("userID" + userID);
    
    models.User
    .find({_id: userID})
    .populate('_friends')
    .exec(function(err, user){
        console.log(user[0]);
        
        var friends = [];
        for (var i = 0; i < user[0]._friends.length; ++i){
            console.log(user[0]._friends[i].userName);
            friends.push({"Name": user[0]._friends[i].userName});
        }
        console.log(friends);
        console.log(myFriends);
        res.render('editTrip', {"myFriends": friends});
    });
    */
    
    var userID = req.session.user._id;
    var tripID = req.params.tripID;
    
    models.Trip
    .find({_id: tripID})
    .populate("_participants")
    .exec(function(err, trip){
        if (err)    return res.send(500);
        if (trip.length == 0)   res.redirect('/index');
        console.log("Current trip: " + trip[0]);
        var participants = [];
        for (var i = 0; i < trip[0]._participants.length; ++i){
            if (trip[0]._participants[i]._id != userID){
                participants.push({"Name": trip[0]._participants[i].userName});
            }
        }
        
        models.User
        .find({_id: userID})
        .populate('_friends')
        .exec(function(err, user){
            console.log(user[0]);

            var friends = [];
            for (var i = 0; i < user[0]._friends.length; ++i){
                console.log(user[0]._friends[i].userName);
                friends.push({"Name": user[0]._friends[i].userName});
            }
            console.log(participants);
            res.render('editTrip', {"myFriends": friends, trip: trip[0], participants: participants, user: {userName: user[0].userName, userImg: user[0].imgURL}});
        });

    });
    
};


exports.edit = function(req, res){
    var userID = req.session.user._id;
    var tripID = req.params.tripID;
    
    var leaveTrip = req.query.leaveTrip;
    
    console.log("Leave Trip: ", leaveTrip);
    
    if (leaveTrip == 'true'){
        console.log("Leave Trip!!!!!");
        models.Trip
        .find({_id: tripID})
        .exec(function(err, trip){
            
            var participants = trip[0]._participants;
            var index = participants.indexOf(userID);
            
            if (index == -1){
                res.redirect('index');
                return;
            }
            participants.splice(index, 1);
            
            models.Trip
            .findOneAndUpdate({_id: tripID}, {$set: {_participants: participants}}, function(err, t){
                if (err)    return res.send(500);
                
                models.User
                .find({_id: userID})
                .exec(function(err, usr){
                    
                    var trips = usr[0]._trips;
                    var index = trips.indexOf(tripID);
                    
                    if (index == -1){
                        res.redirect('index');
                        return;
                    }
                    trips.splice(index, 1);
                    
                    models.User
                    .findOneAndUpdate({_id: userID}, {$set: {_trips: trips}}, function(err, r){
                        if (err)    return res.send(500);
                        
                        res.redirect("/index");
                        return;
                    });
                    
                    
                });
                
            });
            
        });
    }
    
    else{
        var tripName = req.query.tripName;
        var location = req.query.destination;
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        var selectedFriends = req.query.selectedFriends.split(","); 
        var dueDate = req.query.dueDate;

        models.Trip
        .find({_id: tripID})
        .exec(function(err, trip){
            var lastParticipants = [];
            if (trip.length > 0){
                lastParticipants = trip[0]._participants;
            }
            
            console.log("Last participants: " + lastParticipants);

            models.User.find({userName: {$in: selectedFriends}}, function(err, users){
                var participantIDs = [];
                for (var i = 0; i < users.length; ++i){
                    participantIDs.push(users[i]._id);
                }

                console.log("UserID: " + userID);
                participantIDs.push(userID);

                console.log("Edited participants: " + participantIDs);

                var newParticipants = [];
                for (var i = 0; i < participantIDs.length; ++i){
                    if (lastParticipants.indexOf(participantIDs[i]) == -1){
                        newParticipants.push(participantIDs[i]);
                    }
                }
                
                console.log("New Participants: " + newParticipants);

                models.Trip
                .findOneAndUpdate({_id: tripID}, {$set: {tripName: tripName, tripLocation: location, tripStartDate: startDate, tripEndDate: endDate, voteDue: dueDate, _participants: participantIDs}}, function(err,  r){
                    if (err)    return res.send(500);

                    console.log("Edited trip: " + r);

                    var updated = newParticipants.length;
                    if (updated == 0) res.redirect("/index");

                    for (var i = 0; i < newParticipants.length; ++i){
                        models.User.findOneAndUpdate({_id: newParticipants[i]}, {$push: {_trips: tripID}}, function(err, newp){
                            if (err)    return res.send(500);
                            console.log(newp);
                            updated--;
                            if (updated == 0){
                                res.redirect("/index");
                            }
                        });
                    }



                });

            });


        });
    
    }
    
    
};
