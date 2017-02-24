var models = require("../models");

exports.view = function(req, res) {   
    res.render('login', {"Tip":""});
};

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
};

exports.userSignUp = function(req, res){
    var user_data = req.query;
    req.session.user = null;
    console.log("User Signing Up..");
    console.log(user_data);
    
    var newUser = new models.User();
    
    newUser.userName = user_data.userName;
    newUser.passWord = user_data.passWord;
    newUser.imgURL = '/img/profile6.jpg';
    
    models.User
    .find({userName: user_data.userName})
    .exec(function(err, usr){
       if (usr.length > 0){
           //res.json({exist: true});
           res.render("login", {"Tip":" The username already exists. Please select another one or directly login."});
           return;
       }else{
           newUser.save(function(err){
               req.session.user = newUser;
               console.log("Signed up: ", req.session.user);
               res.redirect("/index");
           });
       }
    });
    
};


exports.userLogOut = function(req, res){
    console.log("Log Out");
    req.session.user = null;
    res.redirect("/");
};