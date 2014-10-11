$(function() {

  var cal = $('#calendar').calendario({ startIn: 0 }),
      $month = $('#custom-month').html(cal.getMonthName()),
      $year = $('#custom-year').html(cal.getYear()),
      $currentYear = $('#current-year').attr('data');

  $('#custom-next').on('click', function() {
    cal.gotoNextMonth(updateMonthYear);
  });
  $('#custom-prev').on('click', function() {
    cal.gotoPreviousMonth(updateMonthYear);
  });
  $('#custom-month').on('click', function() {
    cal.gotoNow(updateMonthYear);
  });

  updateCalendar($currentYear);

  $('.form').submit(function(e) {

    e.preventDefault();

    $.post('/login', $('.form').serialize())
      .done(function(data) {
        if (data.nonexistent) {
          validity('.login-input');
        } else if (data.invalidPassword) {
          validity('.login-pw');
        } else {
          window.location = data.redirect;
        }
      })
      .fail(function(data) {
        console.log(fail);
      });
  });

  function validity(elem) {
    var $input = $(elem);

    $input.addClass('invalid');
    setTimeout(function() {
      $input.removeClass('invalid');
    }, 1000);
  }

  function updateCalendar(year) {
    $.getJSON('/shifts/' + year, function(json) {
      var shiftData = {};
      var element;
      _.forEach(json, function(shift, i) {
        _.forEach(shift.employees, function(emp, i) {
          element = '<div class="' + shift.shift + '" data="' + shift.date + '">' + emp + '</div>';
          if (_.isUndefined(shiftData[shift.date])) {
            shiftData[shift.date] = element;
          } else {
            shiftData[shift.date] += element;
          }
        });
      });
      cal.setData(shiftData);
    });
  }

  function updateMonthYear() {
    $month.html(cal.getMonthName());
    $year.html(cal.getYear());
  }

});