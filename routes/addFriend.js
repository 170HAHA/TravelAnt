var myFriends = require("../myfriends.json");
var models = require("../models");

exports.view = function(req, res) { 
    
    var userID = req.session.user._id;
    console.log("USer Id: ", userID);
    
    
    models.User.find().exec(function(err, usrs){
        var notMyFriends = [];
        var allusers = usrs;  
        models.User
        .find({_id: userID})
        .exec(function(err, me){  
            var friends = me[0]._friends;
            for (var i = 0; i < allusers.length; i++){
                if (friends.indexOf(allusers[i]._id) == -1 && allusers[i]._id != userID){
                    notMyFriends.push(allusers[i]);
                    //console.log(allusers[i]._id);
                }
            }
            //console.log(notMyFriends);
            
            res.render('addFriend', {"notMyFriends": notMyFriends, 'user': me[0]}); 
        });
        
    });
    
}

exports.add = function(req, res) { 
    
    var userID = req.session.user._id;
    console.log("USer Id: ", userID);
    var selectedFriends = req.query.selectedFriends.split(","); 
    
    models.User.find({_id: userID}).exec(function(err, curUser){
        models.User.find({userName: {$in: selectedFriends}}, function(err, users){
            //var oldFriends = curUser[0]._friends;
            //console.log("Old Friend List:",oldFriends);
            //console.log("type:" + typeof oldFriends);
            //var newFriendList = oldFriends; 
            for (var i = 0; i < users.length; ++i){
                curUser[0]._friends.push(users[i]._id);
                users[i]._friends.push(curUser[0]._id);
                users[i].save();
                console.log("My Friends' Friend List:" + users[i]._friends);
                
            }
            console.log("New Friend List:" + curUser[0]._friends);
            
            curUser[0].save(function(err){
                res.redirect('/myfriends');
            });
        });                                                             
    });
}