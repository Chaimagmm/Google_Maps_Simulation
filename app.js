//Initializing the map
let map = L.map("map").setView([0, 0], 2);
// Add a tile layer for the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"

}).addTo(map);
//  Layer group to manage markers
let markersLayer = L.layerGroup().addTo(map);


//  Layer group to manage the polyline (routes)
let routeLayer = L.layerGroup().addTo(map);


// Function to calculate distance using Haversine Formula
function calculateDistance(coord1, coord2) {
    const R = 6371; // Radius of the Earth in km
    const lat1 = coord1[0] * (Math.PI / 180);
    const lon1 = coord1[1] * (Math.PI / 180);
    const lat2 = coord2[0] * (Math.PI / 180);
    const lon2 = coord2[1] * (Math.PI / 180);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km, rounded to 2 decimals
}

// Custom Leaflet control for displaying distance
let distanceControl = L.control({ position: "bottomleft" });

distanceControl.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "distance-info");
    this._div.innerHTML = "<b>Distance:</b> - km"; // Default message
    return this._div;
};

// Add the control to the map
distanceControl.addTo(map);


function findLocation() {
    let depart = document.getElementById('location1').value.trim();
    let arrive = document.getElementById('location2').value.trim();

     //  Prevent empty input requests
     if (!depart || !arrive) {
        alert("Please enter both departure and arrival locations.");
        return;
    }

    // API URLs for both locations
    /* Nominatim is a free geocoding service that allows you to:
    ✅ Convert an address/place name into latitude & longitude (Forward Geocoding).
    ✅ Convert coordinates into an address (Reverse Geocoding).
    ✅ Search for places like cities, landmarks, streets, etc. */

    let urlDepart = `https://nominatim.openstreetmap.org/search?q=${depart}&format=json`;
    let urlArrive = `https://nominatim.openstreetmap.org/search?q=${arrive}&format=json`;
    Promise.all([fetch(urlDepart), fetch(urlArrive)])
    .then(responses => {
        if (!responses[0].ok || !responses[1].ok) {
            throw new Error("Failed to fetch location data.");
        }
    
       return  Promise.all(responses.map(res => res.json()));
    })          
    .then(data => {
        let departData = data[0];
        let arriveData = data[1];
         // Check if locations exist
        if (departData.length === 0 || arriveData.length === 0) {
        console.log("One or both locations not found");
        return;
      }

      // Extract coordinates
      let departCoords = [ parseFloat(departData[0].lat), parseFloat(departData[0].lon) ];
      let arriveCoords = [ parseFloat(arriveData[0].lat), parseFloat(arriveData[0].lon) ];

      console.log("Departure Coordinates:", departCoords);
      console.log("Arrival Coordinates:", arriveCoords);

            // Calculate distance between the two points
        let distance = calculateDistance(departCoords, arriveCoords);
        console.log(`Distance: ${distance} km`);

        // Update the distance info panel on the map
        document.querySelector(".distance-info").innerHTML = `<b>Distance:</b> ${distance} km`;


        // Display distance on the map
        L.popup()
        .setLatLng(departCoords)
        .setContent(`<b>Distance:</b> ${distance} km`)
        .openOn(map);

       
       // Create markers with correct popups
       let departMarker = L.marker(departCoords)
       .bindPopup(`<b>Departure:</b> ${depart}`).openPopup();
   
       let arriveMarker = L.marker(arriveCoords)
       .bindPopup(`<b>Arrival:</b> ${arrive}`).openPopup();

        // ✅ Clear old Layers before adding new ones
         markersLayer.clearLayers();
         routeLayer.clearLayers();

       //Adding the markers to the map
       markersLayer.addLayer(departMarker);
       markersLayer.addLayer(arriveMarker);

       //Draw the polyline (route) between the two points
            let routeLine = L.polyline([departCoords, arriveCoords], {
                color: "blue",
                weight: 5,
                opacity: 0.7
            });
      // Add the route to the map
      routeLayer.addLayer(routeLine);
       // ✅ Set the map view to fit both markers
       let bounds = L.latLngBounds([L.latLng(departCoords), L.latLng(arriveCoords)]);
       map.fitBounds(bounds);
    })
    .catch(error => {
      console.log(error);
    });
    

}
