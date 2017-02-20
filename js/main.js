$(document).ready(function() {
  // Handle Navigation
  var links = $('.navigation-link');
  var sections = $('.section');

  links.on('click', function(e) {
    var target = $(e.target);
    var href = target.data('href');
    // console.log('clicked', target, href);

    // Clear out all link activeStates
    links.each(function() {
      $(this).removeClass('active');
    });
    target.addClass('active');

    var targetSection = $('#' + href);
    // console.log('targetSection', targetSection);

    // Clear out all sections active state
    sections.each(function() {
      $(this).removeClass('active');
    });

    // Add active state to targetSection
    targetSection.addClass('active');
  });

  // Create Mapbox Map
  mapboxgl.accessToken = 'pk.eyJ1IjoicGF3a2FtYXBzIiwiYSI6ImNpcHlicHdmdjB4dWZmb20yc2RjajA3MDQifQ.XlGu5UQJWWCZOu2JOAgw0Q';

  var lng = -113.489352;
  var lat = 53.540354;

  // Initialize Mapbox Map
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 16.5,
    interactive: false,
    center: [lng, lat],
    pitch: 55,
    bearing: 150,
  });

  var markerHeight = 40, markerRadius = 10, linearOffset = 0;
  var popupOffsets = {
   'top': [0, 0],
   'top-left': [0,0],
   'top-right': [0,0],
   'bottom': [0, -20],
   'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
   'left': [markerRadius, (markerHeight - markerRadius) * -1],
   'right': [-markerRadius, (markerHeight - markerRadius) * -1]
   };

  var options = {
    closeButton: false,
    closeOnClick: false,
    offset: popupOffsets,
  };

  var popup = new mapboxgl.Popup(options)
    .setLngLat([lng, lat])
    .setHTML("<div class='marker'><div class='hotel'>Fairmont Hotel Macdonald</div><div class='address'>10065 100 St NW, Edmonton, AB T5J 0N6</div></div>")
    .addTo(map);
});
