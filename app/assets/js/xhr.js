$(function() {
  $(".datepicker").datepicker();

  $('.add-worker').click(function(e) {
    var plusOneEmployee = $('.selectEmployee').html();
    $('.employee-container').append(plusOneEmployee);
  });

  $('body').on('click', '.delete-worker', function() {
    // var rowAmt = $('.selectEmployee').siblings('.row').length;
    // if (rowAmt > 0) {
    //   $(this).closest('.row').remove();
    // } else {
    //   alert('Must have at least one worker');
    // }
      $(this).closest('.row').remove();

  });

  $('.delete-btn').click(function(e) {
    var button = $(this);
    var check = confirm('Are you sure you want to delete?');
    if (check) {
      $.ajax(button.attr('href'), {
        method: 'DELETE',
        success: function(result) {
          button.closest('.employee-selection').remove();
        }
      });
    }
  });
});