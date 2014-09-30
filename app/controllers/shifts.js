var Shift = require('../models/shifts');
var Employee = require('../models/employees');
var helpers = require('../lib/helpers');
var moment = require('moment');
var _ = require('lodash');

module.exports.getShifts = function(req, res) {

  var year = parseInt(req.params.year);
  Shift.find({
    date: {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year + 1, 0, 1)
      }
    })
    .exec(function(err, shifts) {
      if (err) throw err;
      res.json(shifts.map(function(shift, i) {
        var date = moment(shift.date);
        return {
          date: date.format("MM-DD-YYYY"),
          shift: shift.shift,
          employees: shift.employees
        };
      }));
    });
};

module.exports.getByDay = function(req, res) {
  var day = new Date(req.body.date);
  Shift.findOne({
    date: day
    })
    .exec(function(err, shift) {
      helpers.getAllEmployees(res, 'admin-edit-shift', shift);
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