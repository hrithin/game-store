var express = require('express');
var router = express.Router();
const adminHelper = require('../controllers/admin-helper');

/* GET home page. */
router.get('/games', function (req, res, next) {


  let sdata = req.session.user;

  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin

    adminHelper.viewCat().then(abc=>{
    
      
      res.render('admin/addgames', { name, admin,abc })
  
     })
   
    
  } else {
    res.render('index')
  }



});

router.get('/list', function (req, res, next) {


  let sdata = req.session.user;

  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
    

    adminHelper.getGames().then((pro) => {

      
         if (pro) {
           res.render('admin/list', { name, admin, pro })
           
         }
         else {
           res.render('admin/list', { name, admin })
   
         }
   
       
     })

  } else {
    res.render('index')
  }

   


});


router.post('/games/addgames',(req,res)=>{

   let data = req.body;
   let image = req.files.gimage
   let file = req.files.gfile
  
    adminHelper.addGame(data,image,file).then(() => {

      res.redirect('/admin/list')
  
    })
  

});

router.get('/list/delete/:id',(req,res)=>{

 
 let gameid = req.params.id;
 adminHelper.delGame(gameid).then(()=>{

  res.redirect('/admin/list')

 })
  
 

});

router.get('/addcategory', function (req, res) {


  let sdata = req.session.user;

  if (sdata) {
    var name = sdata.name
    var admin = sdata.admin
   
   adminHelper.viewCat().then(abc=>{
    
    
    res.render('category', { name, admin,abc })

   })

    
  } else {
    res.redirect('/')
  }



});

router.post('/addcategory', function (req, res) {


adminHelper.addCat(req.body.cat).then() 

res.redirect('/admin/addcategory')


});

router.get('/deletecategory/:id', function (req, res) {

   let i = req.params.id;

   adminHelper.delCat(i).then();

   res.redirect('/admin/addcategory');
  
  
  });


module.exports = router;