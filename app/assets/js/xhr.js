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

  $('.edit.delete-btn').click(function(e) {
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

  $('#delete-shift-btn').click(function(e) {
    if(!confirm('Are you sure you want to delete?')) {
      e.preventDefault();
    }
  });

  $('.form').submit(function(e) {

    e.preventDefault();

    $.post('/admin', $('.form').serialize())
      .done(function(data) {
        console.log(data);
        $('.ajax-success').append('Successfully Created new shift').css('padding', '20px');

        setTimeout(function() {
          $('.ajax-success').fadeOut("slow");
        }, 3000);

      })
      .fail(function(data) {

        console.log('This is data ', data);

        $('.ajax-fail').append('Failed to save new shift').css('padding', '20px');

        setTimeout(function() {
          $('.ajax-fail').fadeOut("slow");
        }, 3000);

      })
      .always(function() {
        console.info('Finished with ');
      });
  });

});