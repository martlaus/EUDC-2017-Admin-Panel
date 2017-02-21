var doubleClick = [NaN, NaN];

$(function () {
    callSchedule();
});

function addEvent(day, time) {
    window.location.href = '/edit-event.html?time=' + time + '&date=' + day;
}

function listenAddEvent(day, time) {
    if (doubleClick[0] !== day || doubleClick[1] !== time) {
        doubleClick[0] = day;
        doubleClick[1] = time;

        setTimeout(function () {
            doubleClick[0] = NaN;
            doubleClick[1] = NaN;
        }, 500);
    } else {
        addEvent(day, time);
    }
}

function callSchedule() {
    makeCall('/event', 'GET', {}, false, function (data) {
        var $table = $('#schedule-table > tbody');

        for (var i = 0; i < 24; i++) {
            var day = document.createElement('tr');
            var hourEvents = [];
            for (var e in data) {
                if (new Date(data[e].startTime).getDate() === new Date(data[e].endTime).getDate()) {
                    if (new Date(data[e].startTime).getHours() <= i && new Date(data[e].endTime).getHours() >= i) {
                        hourEvents.push(data[e]);
                    }
                } else {
                    if (new Date(data[e].startTime).getHours() <= i) {
                        hourEvents.push(data[e]);
                    } else if (new Date(data[e].endTime).getHours() > i) {
                        hourEvents.push(data[e]);
                        hourEvents[hourEvents.length - 1].rollover = true;
                    }
                }
            }

            var index = document.createElement('td');
            var hour = String(i).length > 1 ? String(i) : '0' + String(i);
            index.appendChild(document.createTextNode(hour + ':00'));
            day.appendChild(index);

            hourEvents.sort(function (a, b) {
                return new Date(a.startTime) - new Date(b.startTime);
            });

            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td');
                td.className = 'text-center';
                $(td).attr('onclick', 'listenAddEvent(' + (j + 14) + ', ' + i + ')');

                for (var e in hourEvents) {
                    var rollover = hourEvents[e].rollover;
                    var start = new Date(hourEvents[e].startTime);
                    var end = new Date(hourEvents[e].endTime);

                    if (
                        (!rollover && start.getDate() == 14 + j)
                        || (rollover && start.getHours() <= i && start.getDate() == 14 + j)
                        || (rollover && end.getHours() > i && end.getDate() == 14 + j)
                    ) {
                        if ($(td).children().length) {
                            td.appendChild(document.createElement('hr'));
                        }
                        var _event = document.createElement('a');
                        _event.title = hourEvents[e].description;
                        _event.href = '/edit-event.html?id=' + hourEvents[e].id;
                        _event.appendChild(document.createTextNode(hourEvents[e].title));
                        td.appendChild(_event);
                    }
                }

                day.appendChild(td);
            }

            $table[0].appendChild(day);
        }
    });
}
