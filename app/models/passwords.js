var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var password = new Schema({
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Password = mongoose.model('Passwords', password);

module.exports = Password;