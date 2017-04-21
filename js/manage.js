$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: API_URL + '/roundlocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (obj) {
            $.each(obj, function (key, value) {
                $("#full-round-location").append("<option + value=" + value.id  + ">" + value.name +" </option>");                               
            });
        }
    });
});

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


    makeCall('/card', 'POST', JSON.stringify({
      "title": $("#card-title").val(),
      "description": $("#card-description").val(),
      'pinned': $('#card-pinned').is(':checked'),
      'sendPushAll': $('#card-send-push-all').is(':checked')
    }), true, function (data) {
      $('.create-card-notification').text("Card creation successful!");
      $('#add-card').each(function() {
        this.reset();
      });
      return false;
    });

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
    
    var unixtime = new Date(($('#round-start-time').val())).getTime() / 1000;
    
    $.ajax({
      type: "POST",
      url: API_URL + '/timercard',
      data: JSON.stringify({
        "title" : $("#timercard-title").val(),
        "unixtime": unixtime,
        "locationId": $("#full-round-location").val(),
        "fullLocation": $('#full-round-location').find('option:selected').text() + $("#timercard-room").val(),
        "topic": $("#timercard-topic").val(),
        "team": $("#timercard-team").val()


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