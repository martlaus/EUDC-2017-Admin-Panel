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
            var datEditLink = 'card-detail.html?cardid=' + value.id;

            date = d + "." + m + "." + y + " " + h + ":" + min;
            $('.cards').append('<div class="col-xs-12 col-md-6 card"><div class="col-xs-12 card-header' + pinnedClass + '"><a href="' + datEditLink + '"><h3>' + value.title + pinned + '</h3></a></div><div class="col-xs-12 card-date">' + date + '</div><div class="col-xs-12 card-text">' + value.description + '</div></div>');
        });
      }
    });
});