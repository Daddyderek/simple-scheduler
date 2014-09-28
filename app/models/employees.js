var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  firstName: {
    type: String,
    required: "First name is required"
  },
  lastName: {
    type: String,
    required: "Last name is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Employee = mongoose.model('Employees', employeeSchema);

module.exports = Employee;