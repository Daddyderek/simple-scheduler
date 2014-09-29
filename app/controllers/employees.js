var Employee = require('../models/employees');
var moment = require('moment');

module.exports.save = function(req, res, next) {
  var employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  employee.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      console.log('This is employee', employee);
      res.redirect('/');
    }
  });
};