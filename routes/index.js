var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {


  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin
    res.render('index',{name,admin})
  }else
  {
   res.render('index')
  }



});

module.exports = router;
