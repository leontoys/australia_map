// Initialize the map
var map = L.map('map').setView([-25.2744, 133.7751], 4);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker for a specific location (e.g., Sydney)
var marker = L.marker([-33.8688, 151.2093]).addTo(map);

/* // Load the GeoJSON file
fetch('electoral_boundaries_50p.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a GeoJSON layer and add it to the map
        L.geoJSON(data).addTo(map);
    }); */

/* // Function to geocode electorates using Nominatim
function geocodeElectorate(electorate, callback) {
    // Use Nominatim API to geocode the electorate
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + electorate)
      .then(response => response.json())
      .then(data => {
        // Extract latitude and longitude from the response
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log([latitude, longitude]);
        // Pass the coordinates to the callback function
        callback([latitude, longitude]);
      })
      .catch(error => {
        console.error('Error geocoding electorate:', error);
      });
  } */

// Function to geocode electorates using L.Highlight
function geocodeElectorate(electorate, callback) {
    // Create a new instance of L.Layer.Highlight
    var highlightLayer = new L.Layer.Highlight();

    // Define the search options
    var searchOptions = {
        q: electorate
    };

    // Use the L.Highlight plugin to search for the specified electorate
    highlightLayer.do(searchOptions, {
        eventHandlers: {
            click: function(area) {
                // Extract latitude and longitude from the clicked area
                var latitude = area.latlng.lat;
                var longitude = area.latlng.lng;
                
                // Pass the coordinates to the callback function
                callback([latitude, longitude]);
            }
        }
    });
}

// Parse CSV data and add markers to the map
Papa.parse('mp_data.csv', {
    download: true,
    header: true,
    complete: function(results) {
      results.data.forEach(function(row) {
        // Geocode the electorate to get latitude and longitude
        var electorate = row.Electorate;
        geocodeElectorate(electorate, function(coordinates) {
          // Create a marker with a popup showing MP's information
          L.marker(coordinates)
            .bindPopup('<b>' + row['Hon'] + ' ' + row['Surname'] + ', ' + row['First Name'] + '</b><br>' +
                       'Electorate: ' + row['Electorate'] + '<br>' +
                       'Political Party: ' + row['Political Party'])
            .addTo(map);
        });
      });
    }
  });
  