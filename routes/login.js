var models = require("../models");

exports.view = function(req, res) {   
    res.render('login', {});
}

exports.userLogIn = function(req, res){
    var user_data = req.query;
    req.session.user = null;
    console.log("User Logging In");
    console.log(user_data);
    
    models.User.find({userName: user_data.userName, passWord: user_data.passWord}, function(err, user){
        if (user.length == 0){
            console.log("Wrong username");
            res.render('login', {});
        }else{
            req.session.user = user[0];
            console.log("session.user:", req.session.user);
            res.redirect("/index");
        }
    })
    
    /*
    req.session.user = {userName: user_data["userName"], passWord: user_data["passWord"]};
    res.render("index", {});
    */
}