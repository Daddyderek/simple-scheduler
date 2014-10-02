var express = require('express');
var router = express.Router();
var Shifts = require('../controllers/shifts');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/shifts/:id')
  .get(Shifts.getShifts)
  .put(Shifts.editShift)
  .delete(Shifts.deleteShift);

module.exports = router;