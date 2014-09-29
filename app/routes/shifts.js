var express = require('express');
var router = express.Router();
var shift = require('../controllers/shifts');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/shifts/:id')
  .get(shift.getShifts)
  .put()
  .delete();

module.exports = router;