$(document).ready(function () {
    makeCall('/feedback', 'GET', {}, true, function (data) {

        var formattedDate, d, m, y, h, min, date;
        for (var i in data) {
            var value = data[i];
            formattedDate = new Date(value.created);
            d = formattedDate.getDate();
            m = formattedDate.getMonth();
            y = formattedDate.getFullYear();
            h = formattedDate.getHours();
            min = formattedDate.getMinutes();

            if (value.user) var user = value.user.email;
            date = d + "." + m + "." + y + " " + h + ":" + min;
            $('.feedback').append('<div class="col-xs-6 user"><div class="col-xs-12 card-header"><h4>' + value.content + ' - ' + user + ' </h4></div><div class="col-xs-12 card-date">Created: ' + date + '</div></div>');
        }
    });
});
