var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/scheduler');

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

module.exports = Employee;