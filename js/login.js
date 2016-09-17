$(function() { 

  $('#login-submit').on('click', function(event) {
    event.preventDefault();

    makeCall('/signin', 'POST', JSON.stringify($('#login-form').serializeObject()), true, function (data) {
      if (data.token) {
        setAuth(data.token, data.user.email);
        window.location.href = 'panel-home.html';
      } else {
        handleFail();
      }
    }, function(){
      handleFail();
    });
  });

  function handleFail() {
    $('.alert-error').text("Wrong username or password!");
    $('#password').focus();
  }

});