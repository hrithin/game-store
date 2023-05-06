var express = require('express');
var router = express.Router();
const gameHelper = require('../controllers/game-helper');
/* GET home page. */
router.get('/', function(req, res) {


    let sdata = req.session.user;
   
    if(sdata){
      var name = sdata.name
      var admin = sdata.admin
      let sid = sdata._id

      gameHelper.myGames(sid).then((resu)=>{
       
         
        console.log("point")
        console.log(resu)
       
        

       res.render('mygames',{name,admin,resu})

      })
 
       
    }else
    {
     res.redirect('/')
    }
  
 

});

module.exports = router;