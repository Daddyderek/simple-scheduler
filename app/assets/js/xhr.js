$(function() {

  function ajaxResponse(elem, msg) {
    $(elem).prepend(msg).css('padding', '20px');
    $('.submit-btn').hide();
    setTimeout(function() {
      $(elem).fadeOut("slow");
      $('.submit-btn').show();
    }, 3000);
  }

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

    var $route = $('.route-path').attr('data');
    e.preventDefault();

    $.post($route, $('.form').serialize())
      .done(function(data) {
        if (data.valid) {
          ajaxResponse('.ajax-success', data.msg);
        } else {
          ajaxResponse('.ajax-fail', data.msg);
        }
      })
      .fail(function(data) {
        $('.ajax-fail').prepend('Ajax failure').css('padding', '20px');
      })
      .always(function(response) {
        console.info('Finished with ', response);
      });
  });

});