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
      url: "rest/card",
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

});