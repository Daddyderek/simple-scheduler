var User = require('../models/users');
var Password = require('../models/passwords');
var _ = require('lodash');

module.exports.verify = function(req, res) {
  var password = req.body.password;

  Password.findOne({
    password: password
  }, function(err, _user) {
    if (err) throw err;
    if (_.isNull(_user)) {
    } else {
      req.session.user = _user;
      res.redirect('/calendar');
    }
  });
};

module.exports.verifyAdmin = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username,
    password: password
  }, function(err, _user) {
    if (err) throw err;
    if (_.isNull(_user)) {
      res.send('No user found');
    } else {
      if (_user.admin) {
        req.session.user = _user;
        res.redirect('/admin');
      } else {
        req.session.user = _user;
        res.redirect('/calendar');
      }
    }
  });
};