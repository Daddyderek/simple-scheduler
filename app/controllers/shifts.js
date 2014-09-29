var Shift = require('../models/shifts');
var moment = require('moment');
var _ = require('lodash');

module.exports.getShifts = function(req, res) {

  var year = req.params.year;

  Shift.find({
      date: {
        $gte: new Date(2014, 0, 1),
        $lt: new Date(2014 + 1, 0, 1)
      }
    })
    .exec(function(err, shifts) {
      if (err) throw err;
      console.log('LOOK AT SHIFTS ', shifts);
    });
};

exports.create = function(req, res, next) {

  var shift = new Shift({
    date: new Date(req.body.date),
    employees: req.body.employee,
    shift: req.body.shift
  });
  shift.save(function(err) {
    if (err) res.json(err);
    res.redirect('/');
  });
};