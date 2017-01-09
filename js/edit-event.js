$(document).ready(function() {
     $.ajax({
      type: "GET",
      url: API_URL + '/location',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(obj) {
        $.each(obj, function(key, value) {
            $("#event-location").append("<option>" + value.name + "</option>");
        });
      }
    });
});

$(function() {

  $.datetimepicker.setLocale('en');

  var datepickerOptions = {
    format: 'm.d.Y H:i',
    minDate: '2017/08/14',
    maxDate: '2017/08/20',
    theme: 'dark',
    dayOfWeekStart: 1,
    startDate: '2017/08/14'
  };

  $('#event-start').datetimepicker(datepickerOptions);
  $('#event-end').datetimepicker(datepickerOptions);


  $('#submit-event').on('click', function(event) {
    
    event.preventDefault();
    var $eventEnd = $('#event-end');
    var $eventStart = $('#event-start');
    var $eventLocation = $('#event-location');

    if (new Date($eventEnd.val()) - new Date($eventStart.val()) < 0) {
      $('.create-event-notification').text("Event end time can't be before it starts!");
      return false;
    } else if (!$eventStart.val()) {
      $('.create-event-notification').text("Event start must be specified!");
      return false;
    } else if (!$eventEnd.val()) {
      $('.create-event-notification').text("Event end must be specified!");
      return false;
    }

    var postData = {
      'startTime': new Date($eventStart.val()),
      'endTime': new Date($eventEnd.val()),
      'title': $('#event-title').val(),
      'description': $('#event-description').val()
    };

    var id = $.urlParam('id');

    if (id) {
      postData.id = id;
    }

    makeCall('/event', 'POST', JSON.stringify(postData), true, function (data) {
      $('.create-event-notification').text("Event editing successful!");
      console.log(data);
      if (history.pushState) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + data.id;
          window.history.pushState({path: newurl}, '' , newurl);

          onLoadCallback();
      }

      return false;
    }, function() {
      $('.create-event-notification').html("Some kind of error has revealed itself! Run to the hills!<br>Perhaps your event data simply doesn\'t make any sense?<br>Otherwise pls wait for monkeys in Apaches to be dispatched.");
    });

  });
});

$(document).ready(function () {
  onLoadCallback();
});

function onLoadCallback() {
  var eventId = $.urlParam('id');
  if (eventId) {
    makeCall('/event/', 'GET', {}, false, function (data) {
      for (var id in data) {
        if (data[id].id == eventId) {
          $('#event-title').val(data[id].title);
          $('#event-description').val(data[id].description);
          $('#event-start').val(formatDate(new Date(data[id].startTime)));
          $('#event-end').val(formatDate(new Date(data[id].endTime)));
          $('#delete-event').removeClass('hide');
          break;
        }
      }
    });
  } else {
    if ($.urlParam('date') || $.urlParam('time')) {
      $('#event-start').val(`08.${$.urlParam('date')}.2017 ${$.urlParam('time')}:00`);
    }
  }
  addDeleteListener();
}

function formatDate(dateObj) {
  var s = '';
  s += '0' + (dateObj.getMonth() + 1);
  s += '.' + dateObj.getDate();
  s += '.' + dateObj.getFullYear();
  var hrs = String(dateObj.getHours()).length > 1 ? dateObj.getHours() : '0' + dateObj.getHours();
  s += ' ' + hrs;
  var mins = String(dateObj.getMinutes()).length > 1 ? dateObj.getMinutes() : '0' + dateObj.getMinutes();
  s += ':' + mins;

  return s
}


function addDeleteListener() {
  $('#delete-event').off().click(function (e) {
    e.preventDefault();
    var eventId = $.urlParam('id');
    makeCall('/event/' + eventId, 'DELETE', {}, true, function () {
      window.location.href = '/panel-schedule.html';
    });
  });
}