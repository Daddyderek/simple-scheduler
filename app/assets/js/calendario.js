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
  $('#custom-current').on('click', function() {
    cal.gotoNow(updateMonthYear);
  });

  updateCalendar($currentYear);

  function updateCalendar(year) {
    $.getJSON('/shifts/' + year, function(json) {
      var shiftData = {};
      var element;
      console.log(json);
      _.forEach(json, function(shift, i) {
        _.forEach(shift.employees, function(emp, i) {
          element = '<div class="' + shift.shift + '" data="' + shift.date + '">' + emp + '</div>';
          if (_.isUndefined(shiftData[shift.date])) {
            shiftData[shift.date] = element;
          } else {
            shiftData[shift.date] += element;
          }
        });
        console.log(shiftData[shift.date]);
      });
      cal.setData(shiftData);
    });
  }

  function updateMonthYear() {
    $month.html(cal.getMonthName());
    $year.html(cal.getYear());
  }

});