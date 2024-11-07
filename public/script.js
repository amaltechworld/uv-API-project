$("#getLocationBtn").click(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                console.log("latitude:", latitude);
                console.log("longitude:", longitude);

                // Send latitude and longitude to the server
                sendLocationToServer(latitude, longitude);
            },
            function (error) {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

async function sendLocationToServer(latitude, longitude) {
    try {
        const response = await axios.post("/submit", { latitude, longitude });
        // Handle response from server
        console.log("Response from server:", response.data);
    } catch (error) {
        console.error("Failed to send location to server:", error.message);
    }
}
