$(function() {

  $('.form').submit(function(e) {

    e.preventDefault();

    $.post('/', $('.form').serialize())
      .done(function(data) {
        if (data.valid === false) {
          $('.password-login').addClass('invalid');
          setTimeout(function() {
            $('.password-login').removeClass('invalid');
          }, 1000);
        } else {
          window.location = data.redirect;
        }
      })
      .fail(function(data) {
        console.log(fail);
      });
  });

});