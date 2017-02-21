
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var TripSchema = new Mongoose.Schema({
    "tripName": String,
	"tripLocation": String,
	"tripStartDate": Date,
    "tripEndDate": Date,
    "voteDue": Date,
    "participants": [{type: Schema.Types.ObjectId, ref: 'User'}],
    "activityList": [{type: Schema.Types.ObjectId, ref: 'Activity'}]
});

exports.Trip = Mongoose.model('Trip', TripSchema);

var UserSchema = new Mongoose.Schema({
    "userName": String,
    "imgURL": String,
    "trips": [{type: Schema.Types.ObjectId, ref: 'Trip'}],
    "friends": [{type: Schema.Types.ObjectId, ref: 'User'}]
});

exports.User = Mongoose.model('User', UserSchema);

var ActivitySchema = new Mongoose.Schema({
    "activityName": String,
    "activityComments": String,
    "activityVotes": Number,
    "activityImg": String
});

exports.Activity = Mongoose.model('Activity', ActivitySchema);