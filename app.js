
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');

var index = require('./routes/index');
var project = require('./routes/project');
var myfriends = require('./routes/friends');

var plan = require('./routes/plan');
var planfinished = require('./routes/planfinished');
//var plan = require('./routes/plan');
var addTrip = require('./routes/addTrip');
var login = require('./routes/login');

var addFriend = require('./routes/addFriend');
var settings = require('./routes/settings');
var searchYelp = require('./routes/searchYelp');
var addtoDB = require('./routes/addtoDB');
// Example route
// var user = require('./routes/user');

var app = express();

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'travelant';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
//var mongodb_uri = 'mongodb://heroku_ljp273nd:travelant123@ds161059.mlab.com:61059/heroku_ljp273nd'
//var mongodb_uri = 'mongodb://heroku_gdw18rch:travelant123@ds161069.mlab.com:61069/heroku_gdw18rch?authMode=scram-sha1';
var database_uri = process.env.MONGODB_URI || local_database_uri;
//var database_uri = mongodb_uri;
mongoose.connect(database_uri);


// all environments
app.set('port', process.env.PORT || 3000);

var hbsEngine = handlebars.create({
    helpers: {
        dateFormat: function (date, format) {
            return moment(date).format(format);
        }
    }
});
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', handlebars());
//app.set('view engine', 'handlebars');
app.engine('handlebars', hbsEngine.engine);
app.set('view engine', 'handlebars');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    key: 'session',
    secret: 'SUPER SECRET SECRET',
    store: require('mongoose-session')(mongoose)
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='please signin first';
    return res.redirect('/');
  }
  next();
}

// Add routes here
app.get('/', login.view);
app.get('/login', login.userLogIn);
app.get('/signup', login.userSignUp);
app.get('/logOut', login.userLogOut);
app.get('/index', authentication);
app.get('/index', index.view);
app.get('/myfriends', authentication);
app.get('/myfriends', myfriends.view);

app.get('/plan/:tripID', authentication);
app.get('/plan/:tripID', plan.planInfo);
app.get('/planfinished/:tripID', planfinished.planInfo);

app.get('/vote', authentication);
app.get('/vote', plan.voteUpdate);
//app.get''
//app.get('/project/:id', project.projectInfo);
app.get('/addTrip', authentication);
app.get('/addTrip', addTrip.view);
app.get('/addT', authentication);


/*
app.get('/vote', plan.voteUpdate);

app.get('/addTrip', addTrip.view);

app.get('/addT', addTrip.add);
*/

app.get('/addT', addTrip.add);
app.get('/addFriend', authentication);
app.get('/addFriend', addFriend.view);
app.get('/addF', authentication);
app.get('/addF', addFriend.add);
app.get('/editTrip', authentication);
app.get('/editTrip/:tripID', addTrip.editview);
//app.get('/editT/:tripID', authentication);
app.get('/editT/:tripID', addTrip.edit);
app.get('/settings', authentication);
app.get('/settings',settings.view);

app.get('/uploadImg', authentication);
app.post('/uploadImg',settings.uploadImg);

//app.get('/submitSettings',settings.submitStgs);
app.post('/searchYelp', searchYelp.search);
app.post('/addtoDB',addtoDB.add);



// Example route
// app.get('/users', user.list);
//app.get('/palette', palette.randomPalette);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
