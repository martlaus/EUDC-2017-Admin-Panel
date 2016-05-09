$(function() { 

  $('#login-submit').on('click', function(event) {
    event.preventDefault();
    var found = false;
    
    $.ajax({
      url: 'http://jokeoftheday.ml/rest/user',
      dataType: 'json',
      async: false,
      success: function(data) {
        $.each(data, function(key, value) {
            if (value.email === $("#username").val()) {
              found = true;
              window.location = "panel-home.html";
              return false;
            }
        });
      }
    });
    
    if (found == false) {
      $('.alert-error').text("Wrong username or password!");
      $('#password').val('').focus();
      return false;
    }

  });

});