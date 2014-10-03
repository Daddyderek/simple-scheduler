var helpers = require('../lib/helpers.js');
var User = require('../models/users.js');

module.exports.verify = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username,
    password: password
  }, function(err, users) {
    if (err) throw err;
    var user = users.username;
    if (user === username) {
      req.session.admin = user;
      res.redirect('admin');
    } else {
      res.redirect('/login');
    }
  });
};