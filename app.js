
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var project = require('./routes/project');
var palette = require('./routes/palette');
var myfriends = require('./routes/friends');

var plan = require('./routes/plan');
var planfinished = require('./routes/planfinished');
//var plan = require('./routes/plan');
var addTrip = require('./routes/addTrip');
var login = require('./routes/login');
var addFriend = require('./routes/addFriend');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/index', index.view);
app.get('/myfriends', myfriends.view);

app.get('/plan/:tripID', plan.planInfo);
app.get('/planfinished/:tripID', planfinished.planInfo);
//app.get''
//app.get('/project/:id', project.projectInfo);
app.get('/addTrip', addTrip.view);
app.get('/addT', addTrip.add);
app.get('/addFriend', addFriend.view);
app.get('/addF', addFriend.add);
// Example route
// app.get('/users', user.list);
//app.get('/palette', palette.randomPalette);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
