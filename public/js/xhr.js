$(function() {
  $(".datepicker").datepicker();

  $('.add-worker').click(function(e) {
    var plusOneEmployee = $('.selectEmployee').html();
    $('.employee-container').append(plusOneEmployee);
  });

  $('body').on('click', '.delete-worker', function() {
    var rowAmt = $('.selectEmployee').siblings('.row').length;
    if (location.pathname === '/admin') {
      if (rowAmt > 0) {
        $(this).closest('.row').remove();
      } else {
        alert('Must have at least one worker');
      }
    } else {
      $(this).closest('.row').remove();
    }
  });

  $('#delete-shift-btn').click(function(e) {
    var dblCheck = confirm('Are you sure you sure?');
    if(!confirm('Are you sure you sure you want to delete?')) {
      e.preventDefault();
    }
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