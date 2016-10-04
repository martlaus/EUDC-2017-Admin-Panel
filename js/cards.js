$(function() {
    $.ajax({
      url: API_URL + '/card',
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
            var pinned = value.pinned ? '  (pinned)' : '';
            var pinnedClass = value.pinned ? ' text-danger' : '';

            date = d + "." + m + "." + y + " " + h + ":" + min;
            $('.cards').append('<div class="col-xs-12 col-md-6 card"><div class="col-xs-12 card-header' + pinnedClass + '"><h3>' + value.title + pinned + '</h3></div><div class="col-xs-12 card-date">' + date + '</div><div class="col-xs-12 card-text">' + value.description + '</div></div>');
        });
      }
    });
});