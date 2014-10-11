var Shift    = require('../models/shifts');
var Employee = require('../models/employees');
var helpers  = require('../lib/helpers');
var moment   = require('moment');
var _        = require('lodash');

exports.create = function(req, res, next) {
  var data = req.body;
  var emps;

  if (_.isArray(data.employee)) {
    emps = _.uniq(data.employee);
  } else {
    emps = data.employee;
  }

  if (data.date === '') {
    res.send({
      valid: false,
      msg: 'Did not select a date!'
    });
  } else if (_.isUndefined(data.shift)) {
    res.send({
      valid: false,
      msg: 'Did not select a shift!'
    });
  } else {

    var shift = new Shift({
      date: new Date(data.date),
      employees: emps,
      shift: data.shift
    });

    Shift.findOne({
      date: data.date,
      shift: data.shift
    }, function(err, _shift) {
      if (err) throw err;

      if (_.isNull(_shift)) {
        shift.save(function(err) {
          if (err) throw err;
          res.send({
            valid: true,
            msg: 'Successfully created new shift!'
          });
        });
      } else {
        res.send({
          valid: false,
          msg: 'You already have a '+ _shift.shift +' shift scheduled!'
        });
      }
    });
  }
};

module.exports.getAll = function(req, res, next) {
  Employee.find({})
    .sort({
      firstName: 1
    })
    .lean()
    .exec(function(err, employees) {
      if (err) throw err;
      Shift.find({})
        .sort({
          date: 1
        })
        .lean()
        .exec(function(err, shift) {
          if (err) throw err;
          res.render('admin-edit', {
            employees: employees,
            shifts: helpers.reformatDate(shift)
          });
        });
    });
};

module.exports.getShifts = function(req, res) {

  var year = parseInt(req.params.id);
  Shift.find({
    date: {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year + 1, 0, 1)
      }
    })
    .exec(function(err, shifts) {
      if (err) throw err;
      res.json(shifts.map(function(shift, i) {
        var date = moment(shift.date);
        return {
          date: date.format("MM-DD-YYYY"),
          shift: shift.shift,
          employees: shift.employees
        };
      }));
    });
};

module.exports.getByDay = function(req, res) {
  var id = req.body.id;
  Shift.findOne({
    _id: id
  })
    .exec(function(err, shift) {
      Employee.find({})
        .sort({
          firstName: 1
        })
        .lean()
        .exec(function(err, employees) {
          if (err) throw err;
          res.render('admin-edit-shift', {
            id: shift._id,
            type: shift.shift,
            day: moment(shift.date).format('dddd'),
            date: moment(shift.date).format('MMMM Do YYYY'),
            emps: helpers.formatName(employees),
            shift: shift
          });
        });
    });
};

module.exports.editShift = function(req, res) {
  var id = req.params.id;
  var employees = req.body.employee;

  Shift.findOneAndUpdate({
    _id: id
  }, {
    employees: employees
  }, function(err, shift) {
    if (err) throw err;
    res.redirect('/calendar');
  });
};

module.exports.deleteShift = function(req, res) {
  var id = req.params.id;

  Shift.findOneAndRemove({
    _id: id
  }, function(err, shift) {
    if (err) throw err;
    console.log('Deleted shift', shift);
    res.redirect('/calendar');
  });
};