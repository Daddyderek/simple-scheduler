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

  function updateCalendar(year) {
    $.getJSON('/shifts/' + year, function(json) {
      console.log(json);
    });
  }

  function updateMonthYear() {
    $month.html(cal.getMonthName());
    $year.html(cal.getYear());
  }

});