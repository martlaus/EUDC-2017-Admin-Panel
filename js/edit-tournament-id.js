$(document).ready(function () {
    onLoadCallback();
});

function onLoadCallback() {
    makeCall('/tournamentId/', 'GET', {}, false, function (data) {
        for (var id in data) {
            if (data[id].id == 1) {
                $('#tournament-id').val(data[id].tournamentId);
                break;
            }
        }
    });
    addDeleteListener();
}

function addDeleteListener() {
    $('#delete-tournament-id').click(function (e) {
        e.preventDefault();
        var del = confirm('Are you sure you want to delete the tournament id?');

        if (del) {
            makeCall('/tournamentId', 'DELETE', JSON.stringify({"id": 1}), true, function () {
                window.location.href = '/panel-tournament-id.html';
            });
        }
    });
}

$(function () {
    $('#submit-tournament-id').on('click', function (tournamentId) {
        tournamentId.preventDefault();

        var postData = {
            'id': 1,
            'tournamentId': $('#tournament-id').val()
        };

        makeCall('/tournamentId',
            'POST',
            JSON.stringify(postData),
            true,
            function (data) {
                $('.create-tournament-id-notification').text("Tournament id editing successful!");
                if (history.pushState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + data.id;
                    window.history.pushState({path: newurl}, '', newurl);

                    onLoadCallback();
                }
                return false;
            },
            function () {
                $('.create-tournament-id-notification').html("Some kind of error has revealed itself! Run to the" +
                    " hills!<br>Perhaps your event data simply doesn\'t make any sense?<br>Otherwise pls wait for monkeys in Apaches to be dispatched." + stackTrace());
            });

    });
});