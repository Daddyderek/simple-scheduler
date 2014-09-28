var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.route('/admin')
  .get(function(req, res) {
    res.render('admin');
  })
  .post(function(req, res) {
    res.send(req.body);
  });

router.route('/admin/create')
  .get(function(req, res) {
    res.render('admin-create');
  })
  .post(function(req, res) {
    res.send(req.body);
  });

router.route('/admin/edit')
  .get(function(req, res) {
    res.render('admin-edit');
  })
  .post(function(req, res) {
    res.send(req.body);
  });


module.exports = router;
