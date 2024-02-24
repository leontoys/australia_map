// Initialize the map
var map = L.map('map').setView([-25.2744, 133.7751], 5);

//var map = L.map('map').setView([-37.840935,144.946457], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Custom control for the map title
var titleControl = L.control({ position: 'topleft' });

titleControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'map-title');
    div.innerHTML = '<h1 style="color: #006400; text-align: center; margin: 0;">Australia for Palestine</h1>';
    return div;
};

titleControl.addTo(map);


//Mobile
map.locate({setView: true, maxZoom: 5});

function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
      //.bindPopup("You are within " + radius + " meters from this point").openPopup();
      .bindPopup("You are here ").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
  //alert(e.message);
  //var radius = e.accuracy;

  L.marker([-33.865143, 151.209900]).addTo(map)
      //.bindPopup("You are within " + radius + " meters from this point").openPopup();
      .bindPopup("You are here ").openPopup();

  //L.circle(e.latlng, radius).addTo(map);
}

map.on('locationerror', onLocationError);
