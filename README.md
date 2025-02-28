# Google Maps Simulation

## Overview
This project is a simple web-based Google Maps simulation using [Leaflet.js](https://leafletjs.com/). It allows users to input two locations, find their coordinates, display them on the map with markers, draw a route between them, and calculate the distance between the two points.

## Features
- User inputs two locations (departure & destination)
- Uses the Nominatim API for geocoding
- Displays the locations on an interactive map using Leaflet.js
- Draws a route (polyline) between the two points
- Calculates and displays the distance between locations using the Haversine formula
- Popups show distance information on the map

## Technologies Used
- **HTML**: Structure of the web page
- **CSS**: Styling for the page
- **JavaScript**: Interactive functionality
- **Leaflet.js**: Open-source library for mapping
- **Nominatim API**: Geocoding service for address lookup

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/google-maps-simulation.git
   ```
2. Navigate to the project folder:
   ```sh
   cd google-maps-simulation
   ```
3. Open `index.html` in your browser.

## Usage
1. Enter a departure location in the first input field.
2. Enter a destination location in the second input field.
3. Click on the "Find Locations" button.
4. The map will display the locations with markers, a route between them, and the calculated distance.

## File Structure
```
📂 google-maps-simulation
 ├── 📄 index.html        # Main HTML file
 ├── 📄 style.css         # Stylesheet for UI
 ├── 📄 app.js           # Main JavaScript logic
 ├── 📄 map.png          # Favicon (icon on the browser tab)
```

## How it Works
- The `findLocation()` function takes user input and sends requests to the Nominatim API to get latitude and longitude.
- The results are displayed on a Leaflet map with markers and a polyline route.
- The Haversine formula is used to calculate the distance between the two points.
- A custom Leaflet control is used to display the distance at the bottom left of the map.

## Dependencies
- [Leaflet.js](https://leafletjs.com/) for interactive maps
- [Nominatim API](https://nominatim.org/) for geocoding

## Future Enhancements
- Add auto-suggestions for location input fields
- Integrate real-time traffic data
- Implement an option for different travel modes (walking, driving, etc.)

## License
This project is licensed under the MIT License.

---
Happy coding! 🚀

