/*
 * GET home page.
 */
var data1 = require("../dataFinished.json");

exports.planInfo = function(req, res){
    var planID = req.params.tripID;
    
    var tgt
    for(i=0;i<Object.keys(data1).length;i++) {
        if(data1[i].tripID == planID) {
            tgt = i;
            tgt = parseInt(tgt);
            break;
        }
    }
  res.render('planfinished', {
      'data1':data1[tgt]
  });  
};
