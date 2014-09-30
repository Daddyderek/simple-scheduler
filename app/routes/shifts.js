var express = require('express');
var router = express.Router();
var Shift = require('../controllers/shifts');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/shifts/:year')
  .get(Shift.getShifts)
  .put()
  .delete();

module.exports = router;