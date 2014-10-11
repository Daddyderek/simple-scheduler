var express = require('express');
var index = require('../controllers/index');
var login = require('../controllers/logins');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/')
  .get(function(req, res) {
    res.render('login');
  })
  .post(login.verify);

// middleware for authorization
router.use(function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/');
  } else {
    res.locals.loggedIn = true;
    if (req.session.user.admin) {
      res.locals.admin = true;
    }
    next();
  }
});

router.route('/calendar')
  .get(index.render);

router.route('/login')
  .post(login.verifyAdmin);

router.route('/logout')
  .get(function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;
