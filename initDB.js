
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'travelant';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
//var mongodb_uri = 'mongodb://heroku_ljp273nd:travelant123@ds161059.mlab.com:61059/heroku_ljp273nd'
//var mongodb_uri = 'mongodb://heroku_gdw18rch:travelant123@ds161069.mlab.com:61069/heroku_gdw18rch?authMode=scram-sha1';
var database_uri = process.env.MONGODB_URI || local_database_uri;
//var database_uri = mongodb_uri;


mongoose.connect(database_uri, function(error, db) {
    if(!error){
         console.log("We are connected");
    }
    else
       console.dir(error);
});


// Do the initialization here

// Step 1: load the JSON data
var trip_json = require('./trip.json');
var user_json = require('./user.json');
var activity_json = require('./activity.json');

//Load from activity
models.Activity
  .find()
  .remove()
  .exec(createActivity); // callback to continue at

function createActivity(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = activity_json.length;
  for(var i=0; i<activity_json.length; i++) {
    var json = activity_json[i];
    var activity = new models.Activity(json);

    activity.save(function(err, activity) {
      if(err) return console.error(err);
        
      to_save_count--;
      console.log(to_save_count + ' left to save to activity');
//      console.log(activity);
      if(to_save_count <= 0) {
        console.log('DONE');
        models.Activity.find(function(err, act){
            console.log(act);
        });

      }
    });
  }
    
  //Load from Trip
    models.Trip
      .find()
      .remove()
      .exec(createTrip); // callback to continue at
}


// Step 3: load the data from the JSON file
function createTrip(err) {
  if(err) console.error(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = trip_json.length;  

  models.Activity.find().exec(addTrip);

  function addTrip(err, activities){
      var trips = [new models.Trip(trip_json[0]), new models.Trip(trip_json[1])];
      trips[0]._activityList.push(activities[0]._id);
      trips[0]._activityList.push(activities[1]._id);
      trips[1]._activityList.push(activities[2]._id);
      trips[1]._activityList.push(activities[3]._id);
      trips[0].save(saveTrip);
      trips[1].save(saveTrip);

      function saveTrip(err, trip) {
          if(err) return console.error(err);

          to_save_count--;
          console.log(to_save_count + ' left to save trip');
//          console.log(trip);
          if(to_save_count <= 0) {
            console.log('DONE');
            models.Trip.find(function(err, trip){
                console.log(trip);
            });
          }
      }
      
      models.User
      .find()
      .remove()
      .exec(createUser); // callback to continue at
    
  }

}



// Step 3: load the data from the JSON file
function createUser(err) {
    if(err) console.log(err);

    var to_save_count = user_json.length;
    
    models.Trip.find().exec(addUser);
    
    function addUser(err, res){
        if (err) return console.error(err);
        
        var users = [];
        
        for(var i=0; i<user_json.length; i++) {
            var json = user_json[i];
            users.push(new models.User(json));
            for (var j = 0; j < res.length; j++){
                users[i]._trips.push(res[j]._id);
            }
        }
        users[0]._friends.push(users[1]._id);
        users[1]._friends.push(users[0]._id);

        for (var i = 0; i < users.length; i++){
//            console.log(users[i]);
            users[i].save(function(err, user){
                if(err) return console.error(err);
                to_save_count--;
                console.log(to_save_count + ' left to save users');
                if(to_save_count <= 0) {
                    console.log('DONE');
                    addTripToUser();
                }
            })
        }
        
        function addTripToUser(){
            models.Trip.findOneAndUpdate({tripName: "After-Graduation Trip"}, {$push: {_participants: users[0]._id}}, function(err,r){
                models.Trip.findOneAndUpdate({tripName: "After-Graduation Trip"}, {$push: {_participants: users[1]._id}}, function(err, r){
                    models.Trip.findOneAndUpdate({tripName: "Spring-Break Trip"}, {$push: {_participants: users[0]._id}}, function(err, r){
                        models.Trip.findOneAndUpdate({tripName: "Spring-Break Trip"}, {$push: {_participants: users[1]._id}}, function(err, r){
                            models.User.find(function(err, user){
                                console.log(user);
                                models.Trip.find(function(err, trip){
                                    console.log(trip);
                                    
                                    mongoose.connection.close();
                                    
                                });
                            });
                        });
                    });
                });    
            });    

        }
    }


}


