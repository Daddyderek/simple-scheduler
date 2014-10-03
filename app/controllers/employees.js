var Employee = require('../models/employees');
var helpers = require('../lib/helpers.js');
var _ = require('lodash');
var moment = require('moment');

exports.get = function(req, res, nex) {
  helpers.getAllEmployees(req, res, 'admin');
};

exports.create = function(req, res, next) {
  Employee.findOne({
    firstName: req.body.firstName.toLowerCase()
  }, function(err, user) {
    if (err) throw err;
    if (!_.isNull(user)) {
      if (user.firstName === req.body.firstName.toLowerCase() && user.lastName === req.body.lastName.toLowerCase()) {
        res.send('already created');
      }
    } else {
      var employee = new Employee({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase()
      });
      employee.save(function(err) {
        if (err) throw err;
        res.redirect('/');
      });
    }
  });
};

exports.delete = function(req, res, next) {
  var id = req.param('id');
  console.log('inside here === ', id);

  Employee.findOneAndRemove({
    _id : id
  }, function(err, emp) {
    if (err) throw err;
    res.send('success');
    // res.redirect('/admin');
  });
};