var Employee = require('../models/employees');
var moment = require('moment');
var _ = require('lodash');


module.exports.formatName = function formatName(collection) {
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
};

module.exports.reformatDate = function(collection) {
  var reformatted = [];

  _.forEach(collection, function(val, i) {
    return reformatted.push({
      _id: val._id,
      date: moment(val.date).format("MMM Do YYYY"),
      shift: val.shift,
      createdAt: val.createdAt,
      employees: val.employees
    });
  });

  return reformatted;
};

module.exports.getAllEmployees = function(req, res, view) {
  Employee.find({}, null, {
      sort: {
        firstName: 1
      }
    },
    function(err, employees) {
      if (err) throw err;
      res.render(view, {
        employees: employees,
        names: formatName(employees)
      });
    });
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