// Initialize the map
var map = L.map('map').setView([-25.2744, 133.7751], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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


// Define a custom marker icon with a watermelon image
var watermelonIcon = L.icon({
  iconUrl: 'watermelon-icon.png', // URL to the watermelon image file
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
});

// Define a custom marker icon with a watermelon image
var pinIcon = L.icon({
  iconUrl: 'pin.png', // URL to the watermelon image file
  iconSize: [20, 20], // Size of the icon
  iconAnchor: [20, 40], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
});

// Parse CSV data and add markers to the map
Papa.parse('mp_data_geocoded.csv', {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(function(row) {
      // Extract latitude and longitude from the row
      var latitude = parseFloat(row.Latitude);
      var longitude = parseFloat(row.Longitude);
      if(row.Voted == 'Yes'){    
      // Create a marker with a popup showing MP's information
      L.marker([latitude, longitude], { icon: pinIcon })
        .bindPopup('<b>' + row['Honorific'] + ' ' + row['Surname'] + ', ' + row['First Name'] + '</b><br>' +
                   'Electorate: ' + row['Electorate'] + '<br>' +
                   'Political Party: ' + row['Political Party'])
        .addTo(map);
      }
      else{
      // Create a marker with a popup showing MP's information
      L.marker([latitude, longitude], { icon: watermelonIcon })
        .bindPopup('<b>' + row['Honorific'] + ' ' + row['Surname'] + ', ' + row['First Name'] + '</b><br>' +
                   'Electorate: ' + row['Electorate'] + '<br>' +
                   'Political Party: ' + row['Political Party'])
        .addTo(map);        
      }
    });
  }
});
