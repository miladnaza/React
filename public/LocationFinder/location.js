document.addEventListener("DOMContentLoaded", () => {
    const getLocationButton = document.getElementById("get-location");
    const locationBox = document.getElementById("location-box");

    let map; // Declare map variable

    getLocationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            locationBox.value = "Fetching your location...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Display the map
                    if (!map) {
                        map = L.map("map").setView([latitude, longitude], 13);
                    } else {
                        map.setView([latitude, longitude], 13);
                    }

                    // Add OpenStreetMap tiles
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        maxZoom: 19,
                        attribution: '© OpenStreetMap contributors',
                    }).addTo(map);

                    // Add a marker at the user's location
                    L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup("You are here!")
                        .openPopup();

                    // Use Nominatim's reverse geocoding API to fetch address details
                    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                    fetch(geocodeUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data && data.address) {
                                const { city, county, postcode, country } = data.address;
                                locationBox.value = `
                                    City: ${city || "N/A"}
                                    County: ${county || "N/A"}
                                    Postal Code: ${postcode || "N/A"}
                                `;
                            } else {
                                locationBox.value = "Unable to fetch location details.";
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching location details:", error);
                            locationBox.value = "An error occurred while fetching location details.";
                        });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationBox.value = "Permission denied. Please allow location access.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationBox.value = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            locationBox.value = "The request to get your location timed out.";
                            break;
                        default:
                            locationBox.value = "An unknown error occurred.";
                            break;
                    }
                }
            );
        } else {
            locationBox.value = "Geolocation is not supported by your browser.";
        }
    });
});
