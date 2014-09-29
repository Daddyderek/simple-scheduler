var Employee = require('../models/employees');
var moment = require('moment');
var _ = require('lodash');

exports.get = function(req, res, nex) {
  Employee.find({}, null, {
      sort: {
        firstName: 1
      }
    },
    function(err, employees) {
      if (err) throw err;
      res.render('admin', {
        names: formatName(employees)
      });
    });
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
        res.redirect('/admin');
      });
    }
  });
};

exports.delete = function(req, res, next) {

};

function formatName(collection) {
  var fullNames = [];
  var firstName = _.pluck(collection, 'firstName');
  var lastName = _.pluck(collection, 'lastName');
  _.forEach(firstName, function(name, i) {
    var capitalFirstName = name.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g,
      function(letter) {
        return letter.toUpperCase();
      } 
    );
    fullNames.push(capitalFirstName + ' ' + lastName[i].charAt(0).toUpperCase() + '.');
  });
  return fullNames;
}