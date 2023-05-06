var express = require('express');
const adminHelper = require('../controllers/admin-helper');
const gameHelper = require('../controllers/game-helper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {

  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin
    adminHelper.getGames().then((games)=>{
      console.log(games)
      res.render('games',{name,admin,games})
    })
    
  }else
  {
   res.redirect('/')
  }

});


router.get('/info/:id', function(req, res,) {

  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin

  var game = sdata.mygames
    console.log(game)

    adminHelper.getOne(req.params.id).then((resu)=>{

    
         var pur = game.includes(req.params.id)
      
      
          
      res.render('gameinfo',{name,admin,resu,pur})
    })
      
   
  }

});

router.get('/info/:id/buy', function(req, res,) {

  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin
    adminHelper.getOne(req.params.id).then(datas=>{
       
      res.render('payment',{name,admin,datas});

    })
    
      
   
  }

});


router.get('/info/:id/download', function(req, res,) {

  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin
  
    adminHelper.getOne(req.params.id).then(datas=>{
       
      console.log(datas.gfile)
    var loc = "./public/games/"+datas.gfile;
      res.download(loc, 'game.apk')

    })
     
   
    
      
   
  }

});

router.get('/info/:id/payed', async function (req, res,) {

  let sdata = req.session.user;
 
  if(sdata){
    var name = sdata.name
    var admin = sdata.admin
    let sid = sdata._id
    
    let idd =  req.params.id

     
       
     gameHelper.gameBuy(sid,idd).then((ress)=>{

      if(ress=="done"){
        
        req.session.user.mygames.push(idd)

        res.redirect('/games')

      }
     })

      
   
  }

});

module.exports = router;