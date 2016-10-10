$(function() {
    $.ajax({
      url: API_URL + '/user',
      dataType: 'json',
      success: function(data) {
          var formattedDate, d, m, y, h, min, date;
          $.each(data, function(key, value) {
            formattedDate = new Date(value.created);
            d = formattedDate.getDate();
            m = formattedDate.getMonth();
            y = formattedDate.getFullYear();
            h = formattedDate.getHours();
            min = formattedDate.getMinutes();
            var datEditLink = 'edit-user.html?id=' + value.id;

            date = d + "." + m + "." + y + " " + h + ":" + min;
            $('.users').append('<div class="col-xs-6 user"><div class="col-xs-12 card-header"><a href="' + datEditLink + '"><h4>' + value.email + '</h4></a></div><div class="col-xs-12 card-date">Created: ' + date + '</div></div>');
        });
      }
    });
});
