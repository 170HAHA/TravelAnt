var data = require("../data.json");

exports.addTrip = function(req, res) {    
	// Your code goes here
	//var newName = req.query.name;
	//var newDescription = req.query.description;
	//var newFriend = {
	//			"name": newName,
    //				"description": newDescription,
    //				"imageURL": "http://lorempixel.com/400/400/people"
	//		};
	//data.friends.push(newFriend);
	//console.log(data);
	res.render('addTrip',{
			//'friendData': data
		}
	);
 }