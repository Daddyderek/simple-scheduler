var express = require('express');
var Shifts  = require('../controllers/shifts');
var router  = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/:id')
  .get(Shifts.getShifts)
  .put(Shifts.editShift)
  .delete(Shifts.deleteShift);

module.exports = router;