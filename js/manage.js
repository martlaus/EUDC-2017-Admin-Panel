$(function() {

  $('#submit-card').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "rest/card",
      data: JSON.stringify({
        "title": $("#card-title").val(),
        "description": "default description"
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        found = true;
      }
    })

  });

});