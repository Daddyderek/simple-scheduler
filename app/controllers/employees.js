var Employee = require('../models/employees');
var helpers = require('../lib/helpers.js');
var _ = require('lodash');
var moment = require('moment');

exports.get = function(req, res, nex) {
  helpers.getAllEmployees(req, res, 'admin');
};

exports.create = function(req, res, next) {

  var firstName = req.body.firstName.toLowerCase();
  var lastName = req.body.lastName.toLowerCase();

  Employee.findOne({
    firstName: firstName
  }, function(err, _user) {

    if (err) throw err;

    if (!_.isNull(_user)) {
      if (_user.firstName ===  firstName && _user.lastName === lastName) {
        res.send({
          valid: false,
          msg: 'Employee already exists!'
        });
      }
    } else {
      var employee = new Employee({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase()
      });
      employee.save(function(err) {
        if (err) throw err;
        res.send({
          valid: true,
          msg: 'Successfully created employee!'
        });
      });
    }
  });
};

exports.delete = function(req, res, next) {
  var id = req.param('id');

  Employee.findOneAndRemove({
    _id : id
  }, function(err, emp) {
    if (err) throw err;
    res.send({ valid : true, msg : 'deleted employee' });
  });
};