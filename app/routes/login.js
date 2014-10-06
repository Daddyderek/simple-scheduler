var express = require('express');
var login = require('../controllers/logins');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/login')
  // .get(function(req, res) {
  //   res.render('login');
  // })
  .post(login.verify);

router.route('/logout')
  .get(function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;
