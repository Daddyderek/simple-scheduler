var Shift = require('../models/shifts');
var moment = require('moment');
var _ = require('lodash');

exports.render = function(req, res, next) {
  Shift.find({})
    .lean()
    .exec(function(err, shifts) {
      if (err) throw err;
      res.render('index', {
        year: new Date().getFullYear()
      });
    });
};