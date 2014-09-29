var Employee = require('../models/employees');
var moment = require('moment');

exports.save = function(req, res, next) {
  var employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  employee.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      res.redirect('/');
    }
  });
};

exports.edit = function(req, res, next) {
  
};

exports.delete = function(req, res, next) {
  
};