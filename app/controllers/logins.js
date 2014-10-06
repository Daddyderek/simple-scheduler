var User = require('../models/users.js');
var _ = require('lodash');

module.exports.verify = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username,
    password: password
  }, function(err, users) {
    if (err) throw err;

    if (_.isNull(users)) {
      res.redirect('/login');
    } else {
      if(users.username === username && users.password === password) {
        req.session.admin = users.username;
        res.redirect('admin');
      } else {
        res.redirect('/login');
      }
    }
  });
};