/*
 * GET home page.
 */
//var data = require("../data.json");

exports.planInfo = function(req, res){
    var tripID = req.param._id;
    
    models.Trip
    .find({_id: tripID})
    .populate('_activitiyList')
    .exec(function(err, trip){
        res.render('plan', trip[0]._activityList);
    });
    /*
    var planID = req.params.tripID;
    var tgt
    for(i=0;i<Object.keys(data).length;i++) {
        if(data[i].tripID == planID) {
            tgt = i;
            tgt = parseInt(tgt);
            break;
        }
    }
  res.render('plan', {
      'data':data[tgt]
  });  
  */
};
