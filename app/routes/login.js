var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/login')
  .get(function(req, res) {
    console.log('inside route');
    res.render('login');
  })
  .post(function(req, res) {
    res.send(req.body);
  });

module.exports = router;
