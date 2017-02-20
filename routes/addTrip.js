var data = require("../data.json");
var dataFinished = require("../dataFinished.json");

exports.view = function(req, res) {   
    res.render('addTrip', {});
}

exports.addTrip = function(req, res) {  
    var tripName = req.query.tripName;
    var location = req.query.destination;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    
       
    var dueDate = req.query.dueDate;
    if (dueDate == ""){
       dueDate = startDate;
    }
    //var participants = req.query.participants;
	var newTrip = {
                "tripName" : tripName,
                "tripLocation":  location,
                "tripStartDate": startDate,
                "tripEndDate" : endDate,
                "voteDue": dueDate
                //"participants": participants
			}
	data.push(newTrip);
	console.log(data);
    res.render('index', {'Routesdata': data, 'RoutesdataFinished': dataFinished});

}
/*
[
                {
                "Name" : "John",
                "imageUrl": "img/profile3.jpg"
                },
                {
                "Name" : "Amy",
                "imageUrl": "img/profile4.jpg"
                }
                ],
                */