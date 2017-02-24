
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var TripSchema = new Mongoose.Schema({
    "tripName": String,
	"tripLocation": String,
	"tripStartDate": Date,
    "tripEndDate": Date,
    "voteDue": Date,
    "_participants": [{type: Schema.Types.ObjectId, ref: 'User'}],
    "_activityList": [{type: Schema.Types.ObjectId, ref: 'Activity'}]
});

var UserSchema = new Mongoose.Schema({
    "userName": String,
    "passWord": String,
    "imgURL": String,
    "_trips": [{type: Schema.Types.ObjectId, ref: 'Trip'}],
    "_friends": [{type: Schema.Types.ObjectId, ref: 'User'}],
    "voted": [{type: Schema.Types.ObjectId}]
});


var ActivitySchema = new Mongoose.Schema({
    "activityName": String,
    "activityComments": String,
    "activityVotes": Number,
    "activityImg": String
});

exports.Trip = Mongoose.model('Trip', TripSchema);
exports.User = Mongoose.model('User', UserSchema);
exports.Activity = Mongoose.model('Activity', ActivitySchema);
