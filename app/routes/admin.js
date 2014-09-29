var express = require('express');
var router = express.Router();
var employee = require('../controllers/employees');
var shift = require('../controllers/shifts');

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/admin')
  .get(employee.get)
  .post(shift.create);

router.route('/admin/create')
  .get(function(req, res) {
    res.render('admin-create');
  })
  .post(employee.create);

router.route('/admin/edit')
  .get(function(req, res) {
    res.render('admin-edit');
  })
  .post(function(req, res) {
    res.send(req.body);
  });


module.exports = router;
