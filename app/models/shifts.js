var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var shiftSchema = new Schema({
  date: {
    type: Date,
    required: "Date is required"
  },
  employees: {
    type: [],
    required: "Last name is required"
  },
  shift: {
    type: String,
    required: "A shift is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Shift = mongoose.model('Shifts', shiftSchema);

module.exports = Shift;