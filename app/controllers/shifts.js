var Shift = require('../models/shifts');
var moment = require('moment');
var _ = require('lodash');

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