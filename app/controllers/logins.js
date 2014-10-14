var User     = require('../models/users');
var Password = require('../models/passwords');
var _        = require('lodash');

module.exports.verify = function(req, res) {
  var password = req.body.password;

  Password.findOne({
    password: password
  }, function(err, _user) {
    if (_.isNull(_user)) {
      res.send({ valid : false });
    } else {
      req.session.user = _user;
      res.send({ redirect : '/calendar' });
    }
  });
};

module.exports.verifyAdmin = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }, function(err, _user) {
    if (err) throw err;
    if (_.isNull(_user)) {
      res.send({ nonexistent : true });
    } else if(_user.password !== password) {
      res.send({ invalidPassword : true });
    } else {
      if (_user.admin) {
        req.session.user = _user;
        res.send({ redirect : '/admin' });
      }
    }
  });
};