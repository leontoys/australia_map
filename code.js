         // Create the map
         var map = L.map('map').setView([51.505, -0.09], 13);
 
         // Add a tile layer
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);
 
         // Load the GeoJSON data
         fetch('your_geojson_file.geojson')
             .then(response => response.json())
             .then(data => {
                 // Add GeoJSON layer to the map
                 L.geoJSON(data).addTo(map);
             });