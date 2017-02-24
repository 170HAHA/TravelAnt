//var myFriends = require("../myfriends.json");

var models = require("../models");
var fs = require('file-system');

exports.view = function(req, res) {
    var userID = req.session.user._id;
    
    models.User
    .find({_id: userID})
    .exec(function(err, usr){
        res.render('settings', {user: usr[0]});
    });
    
    
}

exports.submitStgs = function(req, res) {  
    //var selectedFriends = req.query.selectedFriends;
    
	//var newFriends = {
      //          "Name" : selectedFriends
                //"imageURL":
		//	}
	//myFriends.push(newFriends);
	//console.log(myFriends);
    res.render('index', {});
}

exports.uploadImg = function(req, res){
    console.log(req.body);
    console.log(req.files);
    console.log("user id is :" + req.session.user._id);
    var userID = req.session.user._id;
    
    /*if (!req.files.userImg){
        console.log("no file attached!");
        res.json({error: "please select a file!"});
    }else*/{
        var tmp_path = req.files.userImg.path;
        var target_path = './public/img/' + req.files.userImg.name;
        
        fs.readFile(tmp_path, function (err, data) {
            if (err)    throw err;
            fs.writeFile(target_path, data, function (err) {
                models.User
                .findOneAndUpdate({_id: userID}, {$set: {imgURL: target_path.substring(9)}}, function(err, r){
                    if (err)    return res.status(500).send();
                    res.redirect("/index");
                });
            });
        });
        
        /*
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                console.log(req.files.userImg.path);
                models.User
                .findOneAndUpdate({_id: userID}, {$set: {imgURL: target_path}}, function(err, r){
                    if (err)    return res.status(500).send();
                    res.redirect("/index");
                });
            });
        });
        */
        
    }
}