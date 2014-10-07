var express = require('express');
var router = express.Router();
var index = require('../controllers/index');
var login = require('../controllers/logins');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/')
  .get(index.render);

router.route('/login')
  .get(function(req, res) {
    res.render('login');
  })
  .post(login.verify);

router.route('/logout')
  .get(function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;
