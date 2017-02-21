var data = require("../data.json");
var dataFinished = require("../dataFinished.json");
var path = require('path');

exports.view = function(req, res) {   
    res.render('addTrip', {});
    //res.sendFile(path.join(__dirname+ '../views/addTrip.html' ));
    console.log("__dirname");
}

exports.add = function(req, res) {  
    var tripName = req.query.tripName;
    var location = req.query.destination;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var selectedFriends = req.query.selectedFriends;
    console.log("selected:" + selectedFriends);
    var dueDate = req.query.dueDate;
    if (dueDate == ""){
       dueDate = startDate;
    }
	var newTrip = {
                "tripName" : tripName,
                "tripLocation":  location,
                "tripStartDate": startDate,
                "tripEndDate" : endDate,
                "voteDue": dueDate,
                "participants": selectedFriends
			}
	data.push(newTrip);
	console.log(data);
    res.render('index', {'Routesdata': data, 'RoutesdataFinished': dataFinished});
}