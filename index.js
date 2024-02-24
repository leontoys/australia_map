// Function to switch between map.js and choropleth.js
function switchMap(scriptSrc) {
    // Remove existing Leaflet map instance if it exists
    if (typeof map !== 'undefined') {
        map.remove();
    }
    // Remove existing Leaflet script
    var leafletScript = document.getElementById('leafletScript');
    leafletScript.parentNode.removeChild(leafletScript);

    // Create a new script element
    var newScript = document.createElement('script');
    newScript.id = 'leafletScript';
    newScript.src = scriptSrc;

    // Append the new script to the body
    document.body.appendChild(newScript);
}

// Example event listener for the button
document.getElementById('toggleButton').addEventListener('click', function () {
    // Example function to toggle something on the map
    // This function doesn't exist, it's just an example
    // Toggle between map.js and choropleth.js
    var currentScript = document.getElementById('leafletScript').src;
    if (currentScript.includes('map.js')) {
        switchMap('choropleth.js');
    }
    else {
        switchMap('map.js');
    }
});
