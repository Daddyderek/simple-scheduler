var express = require('express');
var router = express.Router();
var employee = require('../controllers/employees');
var shift = require('../controllers/shifts');

router.use(function(req, res, next) {
  console.log(req.method, req.url);

  res.locals.admin = false;
  if (req.session.user.admin) {
    res.locals.admin = true;
    next();
  } else {
    res.redirect('/');
  }
});

router.route('/')
  .get(employee.get)
  .post(shift.create);

router.route('/create')
  .get(function(req, res) {
    res.render('admin-create');
  })
  .post(employee.create);

router.route('/edit')
  .get(shift.getAll)
  .post(shift.getByDay);

router.route('/edit/:id')
  .delete(employee.delete);


module.exports = router;
