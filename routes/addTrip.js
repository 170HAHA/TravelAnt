//var data = require("../data.json");
//var dataFinished = require("../dataFinished.json");
var path = require('path');
var models = require('../models');

exports.view = function(req, res) {   
    res.render('addTrip', {});
    //res.sendFile(path.join(__dirname+ '../views/addTrip.html' ));
    console.log("__dirname");
}

exports.add = function(req, res) {  
    var curUserID = req.session.user._id;
    
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
        
        for (var i = 0; i < userIDs.length; ++i){
            newTrip._participants.push(userIDs[i]);
        }
        
        console.log(newTrip);
        
        for (var i = 0; i < users.length; ++i){
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
}