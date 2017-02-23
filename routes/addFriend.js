var myFriends = require("../myfriends.json");

exports.view = function(req, res) {   
    res.render('addFriend', {});
}

exports.add = function(req, res) {  
    var selectedFriends = req.query.selectedFriends;
    
	var newFriends = {
                "Name" : selectedFriends
                //"imageURL":
			}
	myFriends.push(newFriends);
	console.log(myFriends);
    res.render('myfriends', {'Friends': myFriends});
}