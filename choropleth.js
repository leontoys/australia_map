/* // Initialize the map
var map = L.map('map').setView([-25.2744, 133.7751], 5);

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
 */

// map.js or choropleth.js

// Dynamically load common.js
var script = document.createElement('script');
script.src = 'common.js';
script.onload = function() {
    // Your map-specific or choropleth-specific code here
// Initialize an empty object to store MP data by electorate
var mpData = {};

// Parse CSV data and store it into the object
Papa.parse('mp_data_geocoded.csv', {
    download: true,
    header: true,
    complete: function (results) {
        results.data.forEach(function (row) {
            var electorate = row.Electorate;
            mpData[electorate] = {
                voted: row.Voted
            };
        });

        // Now you have access to the MP data by electorate in the mpData object
        console.log(mpData);

        // Load GeoJSON data
        fetch('electoral_boundaries_50p.geojson')
            .then(response => response.json())
            .then(geojsonData => {
                var geojsonLayer = L.geoJSON(geojsonData, {
                    style: function (feature) {
                        var electorateName = feature.properties.Elect_div;
                        var mp = mpData[electorateName];
                        var fillColor = '#cccccc'; // Default color
                        if (mp) {
                            fillColor = mp.voted === 'Yes' ? 'Green' : 'Red';
                        }
                        return {
                            fillColor: fillColor,
                            weight: 1,
                            opacity: 1,
                            color: 'white',
                            fillOpacity: 0.7
                        };
                    },
                    onEachFeature: function (feature, layer) {
                        var electorateName = feature.properties.Elect_div;
                        var mp = mpData[electorateName];
                        layer.bindPopup('<b>' + electorateName + '</b><br>Voted: ' + (mp ? mp.voted : 'Unknown'));                    }
                }).addTo(map);
            });
    }
});

};
document.head.appendChild(script);


