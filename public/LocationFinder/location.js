document.addEventListener("DOMContentLoaded", () => {
    const getLocationButton = document.getElementById("get-location");
    const locationBox = document.getElementById("location-box");

    let map; // Declare the map variable

    getLocationButton.addEventListener("click", () => {
        // Fixed coordinates and store details
        const latitude = 43.8828; // Replace with the store's latitude
        const longitude = -78.9434; // Replace with the store's longitude
        const storeDetails = `
            Address: 7 Kingfisher Way
            City: Whitby
            State: Ontario
            Postal Code: L1P 0K3
            Country: Canada
        `;

        // Display the store details in the location box
        locationBox.value = storeDetails;

        // Initialize or update the map
        if (!map) {
            map = L.map("map").setView([latitude, longitude], 15); // Center on store location
        } else {
            map.setView([latitude, longitude], 15); // Update map center if it already exists
        }

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // Add a marker at the store's location
        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("<b>BookStore</b>") // Display "BookStore" in the popup
            .openPopup();
    });
});
