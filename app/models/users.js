var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model('Users', user);

module.exports = User;