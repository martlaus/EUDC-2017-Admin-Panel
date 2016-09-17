$(function() {

  $('#submit-card').on('click', function(event) {
    event.preventDefault();

    if ($('#card-title').val() === "") {
      $('.create-card-notification').text("Title field can't be empty!");
      $('#card-title').focus();
      return false;
    } else if ($('#card-description').val() === "") {
      $('.create-card-notification').text("Description field can't be empty!");
      $('#card-description').focus();
      return false;
    }


    $.ajax({
      type: "POST",
      url: API_URL + '/card',
      data: JSON.stringify({
        "title": $("#card-title").val(),
        "description": $("#card-description").val()
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('.create-card-notification').text("Card creation successful!");
        $('#add-card').each(function() {
          this.reset();
        });
        return false;
      }
    })

  });

  $('#submit-timercard').on('click', function(event) {
    event.preventDefault();
    
    if ($('#timercard-title').val() === "") {
      $('.create-timercard-notification').text("Title field can't be empty!");
      $('#timercard-title').focus();
      return false;
    } else if ($('#timercard-description').val() === "") {
      $('.create-timercard-notification').text("Description field can't be empty!");
      $('#timercard-description').focus();
      return false;
    }
    
    var enddate = new Date(($('#round-start-time').val())).toISOString().slice(0, 19).replace('T', ' ');
    console.log(enddate);
    
    $.ajax({
      type: "POST",
      url: API_URL + '/timercard',
      data: JSON.stringify({
        "title" : $("#timercard-title").val(),
        "enddate": enddate,
        "description": $("#timercard-description").val()
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('#add-timercard').each(function() {
          this.reset();
        });
        return false;
      }
    });

  });

});