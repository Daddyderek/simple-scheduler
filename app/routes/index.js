var express = require('express');
var router = express.Router();
var index = require('../controllers/index');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/')
  .get(index.render);
module.exports = router;
