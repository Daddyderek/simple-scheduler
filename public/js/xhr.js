$(function() {
  $(".datepicker").datepicker();
  $('.add-worker').click(function(e) {
    var plusOneEmployee = $('.selectEmployee').html();  
    $('.employee-container').append(plusOneEmployee);
  });
});