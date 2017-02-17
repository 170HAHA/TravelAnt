/*
 * GET home page.
 */
var data = require("../data.json");

exports.planInfo = function(req, res){
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
};
