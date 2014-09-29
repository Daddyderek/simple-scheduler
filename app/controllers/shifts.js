var Shift = require('../models/shifts');
var moment = require('moment');
var _ = require('lodash');

module.exports.getShifts = function(req, res) {

  var year = parseInt(req.params.year);

  Shift.find({

    })
    .exec(function(err, shifts) {
      console.log(shifts);
      return {

      };
    });
};

exports.create = function(req, res, next) {

  var shift = new Shift({
    date: req.body.date,
    employees: req.body.employee,
    shift: req.body.shift
  });
  shift.save(function(err) {
    if (err) res.json(err);
    res.redirect('/');
  });
};