var map,
    markers = [],
    markerLocation = {
        lat: 0,
        lng: 0
    };


$.ajax({
    url: API_URL + '/location',
    dataType: 'json',
    success: function(data) {

        $.each(data, function(key, value) {
            var lat  = value.lat,
                lng  = value.lng,
                name = value.name,
                id   = value.id;

            $('.table--locations__body').append('<tr data-id="' + id + '" data-lat="' + lat + '" data-lng="' + lng + '"><td>' + name + '</td><td class="button-padding"><div class="table--locations__button table--locations__button--view">View on map</div></td><td class="button-padding"><div class="table--locations__button table--locations__button--delete"><i class="ion-trash-a ion"></i>Delete</div></td></tr>');
        });

        $('.table--locations__button--view').on('click', function() {
            var dataLat = $(this).closest('tr').data('lat'),
                dataLng = $(this).closest('tr').data('lng');

            var markerLocation = new google.maps.LatLng(parseFloat(dataLat), parseFloat(dataLng));

            clearMarkers();
            placeMarker(markerLocation);
            map.setCenter(markerLocation);
        });

        $('.table--locations__button--delete').on('click', function() {
            var $location = $(this).closest('tr'),
                dataId = $(this).closest('tr').data('id');

            $.ajax({
                url: API_URL + '/location/' + dataId ,
                type: 'DELETE',
                success: function(data) {
                  console.log("Tehtud!");
                  $location.remove();
                }
            });
        });
    }
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 59.3958836,
            lng: 24.6692373
        },
        zoom: 14
    });

    map.addListener('click', function(event) {
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

$('#submit-card').on('click', function(event) {
    event.preventDefault();

    if ($('#card-title').val() === "") {
        $('.create-card-notification').text("Name field can't be empty!");
        $('#card-title').focus();
        return false;
    } else if (markerLocation.lat == 0) {
        $('.create-card-notification').text("You have to choose a location on the map!");
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
        success: function(data) {
            $('.create-card-notification').text("Location has been added successfully!");
            $('#add-card').each(function() {
                this.reset();
            });
            clearMarkers();

            markerLocation = {
                lat: 0,
                lng: 0
            };

            return false;
        }
    })

});
