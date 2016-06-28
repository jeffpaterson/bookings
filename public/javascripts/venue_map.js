//- javascripts > venue_map.js

var venueMap;
var venueAddress;
var venueMap2 = {lat: 37.7838801, lng: -122.4325558};
var venueAddress="1538 Fillmore St, San Francisco, 94115";

// knex('venues').where('id', req.params.id).first().then((venue) =>{
//   venueAddress=venue.street_address+", "+venue.city+", "+venue.zipcode; 
// });

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: venueMap2,
    zoom: 15
  });
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: venueMap2,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);
  codeAddress(venueAddress);
}

function codeAddress(venueAddress) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {address:venueAddress}, function(results) {
      venueMap = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }        
  });
}