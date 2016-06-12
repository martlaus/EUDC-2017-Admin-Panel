var map,
    markers = [],
    markerLocation = {
      lat: 0,
      lng: 0
    };

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.3958836, lng: 24.6692373},
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
    url: "rest/location",
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
      return false;
    }
  })

});
