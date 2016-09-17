$(function() {
    
    var formattedDate, d, m, y, h, min, date;
    function formatDate(date) {
        formattedDate = new Date(date);
        d = formattedDate.getDate();
        m = formattedDate.getMonth();
        y = formattedDate.getFullYear();
        h = formattedDate.getHours();
        min = formattedDate.getMinutes();
        date = d + "." + m + "." + y + " " + h + ":" + min;
        return date;
    }

 
    $.ajax({
      url: API_URL + '/timercard',
      dataType: 'json',
      success: function(data) {
          
        $.each(data, function(key, value) {
            var createdDate = formatDate(value.created);
            var endDate = formatDate(value.endDate);
            $('.cards').append('<div class="col-xs-12 col-md-6 card"><div class="col-xs-12 card-header"><h3>' + value.title + '</h3></div><div class="col-xs-12 card-date">' + createdDate + '</div><div class="col-xs-12 card-text">' + value.description + ' ' + endDate + '</div></div>');
        });
      }
    });


});