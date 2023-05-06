var express = require('express');
const session = require('express-session');
var router = express.Router();
const accountHelper = require('../controllers/account-helper');

/* GET home page. */
router.get('/login', function(req, res, next) {


  res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
  });


  router.get('/logout', function(req, res, next) {
       req.session.destroy();
       res.redirect('/account/login');
  });



  router.post('/register/action', function (req, res, ) {

    accountHelper.doSignup(req.body).then()

    

    res.redirect('/account/login')

})


router.post('/login/action', function (req, res, ) {

  accountHelper.doLogin(req.body).then((done) => {

    if (done.Status == true) {
      req.session.status = true
      req.session.user = done.user
      console.log(req.session.user)
      res.redirect('/')
    } else {
      res.redirect('/account/login')
    }
  })


})

module.exports = router;