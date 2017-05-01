var map,
    markers = [],
    markerLocation = {
        lat: 0,
        lng: 0
    };
$(function () {
    makeCall('/location',
        'GET',
        {},
        false,
        function (data) {
            locationCatchSuccess(data)
        },
        console.log("Failed to fetch locations!" + stackTrace())
    );
    makeCall('/roundlocation',
        'GET',
        {},
        false,
        function (data) {
            roundLocationCatchSuccess(data)
        },
        console.log("Failed to fetch round locations!" + stackTrace())
    );
});

function locationCatchSuccess(data) {
    $.each(data, function (key, value) {
        var lat = value.lat,
            lng = value.lng,
            name = value.name,
            id = value.id;

        $('.table--locations__body').append('<tr data-id="' + id + '" data-lat="' + lat + '" data-lng="' + lng + '"><td>' + name + '</td><td class="button-padding"><div class="table--locations__button table--locations__button--view">View on map</div></td><td class="button-padding"><div class="table--locations__button table--locations__button--delete"><i class="ion-trash-a ion"></i>Delete</div></td></tr>');
    });

    $('.table--locations__button--view').on('click', function () {
        var dataLat = $(this).closest('tr').data('lat'),
            dataLng = $(this).closest('tr').data('lng');

        var markerLocation = new google.maps.LatLng(parseFloat(dataLat), parseFloat(dataLng));

        clearMarkers();
        placeMarker(markerLocation);
        map.setCenter(markerLocation);
    });

    $('.table--locations__button--delete').on('click', function () {
        var $location = $(this).closest('tr'),
            dataId = $(this).closest('tr').data('id');
        makeCall('/location/' + dataId,
            'DELETE',
            '',
            false,
            function (data) {
                console.log("Location at" + dataId + "is DELETED");
            },
            console.log("DELETE at" + dataId),
            $location.remove());
    });
}

function roundLocationCatchSuccess(data) {
    var imgurl, name, id;

    $.each(data, function (key, value) {
        imgurl = value.imgurl,
            name = value.name,
            id = value.id;

        $('.table--rlocations__body').append('<tr data-id="' + id + '" data-name="' + name + '" data-imgurl="' + imgurl + '"><td>' + name + '</td><td class="button-padding"><div class="table--locations__button table--locations__button--view round">View image</div></td><td class="button-padding"><div class="table--locations__button table--locations__button--delete round"><i class="ion-trash-a ion"></i>Delete</div></td></tr>');
    });

    $('.table--locations__button--view round').on('click', function () {
        window.open(imgurl);
    });

    $('.table--locations__button--delete round').on('click', function () {
        var $roundLocation = $(this).closest('tr'),
            dataId = $(this).closest('tr').data('id');

        makeCall('/roundlocation/' + dataId,
            'DELETE',
            '',
            function (data) {
                console.log("Round location removed!");
                $roundLocation.remove();
            },
            console.log("failed to delete card at" + dataId + "\n adding stacktrace::" + stackTrace())
        );
    });
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 59.3958836,
            lng: 24.6692373
        },
        zoom: 14
    });

    map.addListener('click', function (event) {
        placeMarker(event.latLng);
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function placeMarker(location) {
    clearMarkers();

    markerLocation.lat = location.lat().toFixed(6);
    markerLocation.lng = location.lng().toFixed(6);

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    markers.push(marker);
}

$('#submit-card').on('click', function (event) {
    event.preventDefault();

    if ($('#card-title').val() === "") {
        $('#generalLocation').text("Name field can't be empty!");
        $('#card-title').focus();
        return false;
    } else if (markerLocation.lat == 0) {
        $('#generalLocation').text("You have to choose a location on the map!");
        return false;
    }


    $.ajax({
        type: "POST",
        url: API_URL + '/location',
        data: JSON.stringify({
            "name": $('#card-title').val(),
            "lat": markerLocation.lat,
            "lng": markerLocation.lng
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#generalLocation').text("Location has been added successfully!");
            $('#add-card').each(function () {
                this.reset();
            });
            clearMarkers();

            markerLocation = {
                lat: 0,
                lng: 0
            };

            return false;
        },
        end: location.reload()
    })

});

$('#submit-round-location').on('click', function (event) {
    event.preventDefault();

    function isURL(str) {
        var pattern = new RegExp(/\.(jpe?g|png|gif|bmp|tiff)$/i);
        console.log(pattern.test(str));
        return pattern.test(str);
    }

    if ($('#round-location-title').val() === "") {
        $('#roundLocation').text("Name field can't be empty!");
        $('#round-location-title').focus();
        return false;
    } else if ($('#round-location-imgurl').val() === "") {
        $('#roundLocation').text("URL field can't be empty!");
        $('#round-location-imgurl').focus();
        return false;
    } else if (!isURL($('#round-location-imgurl').val())) {
        $('#roundLocation').text("URL must be correct!");
        $('#round-location-imgurl').focus();
        return false;
    }


    $.ajax({
        type: "POST",
        url: API_URL + '/roundlocation',
        data: JSON.stringify({
            "name": $('#round-location-title').val(),
            "imgurl": $('#round-location-imgurl').val(),
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#roundLocation').text("Round Location has been added successfully!");
            $('#add-card').each(function () {
                this.reset();
            });

            return false;
        },
        end: location.reload()
    })

});