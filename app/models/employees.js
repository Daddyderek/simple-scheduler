var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Employee = mongoose.model('Employees', employeeSchema);

// Validations
// Employee.schema.path('firstName')
//   .validate(function(name) {
//     return name.length < 2;
//   }, 'Name must be at least 2 characters long.');

// Employee.schema.path('lastName')
//   .validate(function(name) {
//     return name.length < 2;
//   }, 'Last name must be at least 2 characters long.');

module.exports = Employee;