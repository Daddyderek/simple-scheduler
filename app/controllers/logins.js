var User = require('../models/users.js');
var _ = require('lodash');

module.exports.verify = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username,
    password: password
  }, function(err, _user) {
    if (err) throw err;

    if (_.isNull(_user)) {
      res.redirect('/login');
    } else {
      req.session = _user.username;
      res.redirect('admin');
    }
  });
};