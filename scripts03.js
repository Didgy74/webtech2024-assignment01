const postcontainer = document.querySelector("#container")

let currentCity = "Tokyo";
let currentX = 35.7;
let currentY = 139.687;
let intervalId = null;
const refreshIntervalTime = 600000; // Update every 10 minutes.
let lastRefreshTime = Date.now();

function updateCity(x, y, name) {
    currentCity = name;
    currentX = x;
    currentY = y;

    if (intervalId != null) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(loadData, refreshIntervalTime); // Update every 10 minutes 
    loadData();
}

const remainingTimeDiv = document.querySelector("#remainingTime");
function updateRemainingTimeCounter() {
    if (intervalId == null) {
        remainingTimeDiv.textContent = `Remaining time until refresh:`;
    } else {
        const elapsedTime = Date.now() - lastRefreshTime;
        const remainingTimeSeconds = Math.round((refreshIntervalTime - elapsedTime) / 1000);
        remainingTimeDiv.textContent = `Remaining time until refresh: ${remainingTimeSeconds} seconds`;
    }
}
setInterval(updateRemainingTimeCounter, 1000); // Update every second.


function loadData() {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lastRefreshTime = Date.now();
            updateRemainingTimeCounter();

            // Step 3: Add content to the paragraph
            let asJson = JSON.parse(this.responseText);

            const latitudeDiv = document.querySelector("#latitude");
            latitudeDiv.textContent = `Latitude: ${asJson.latitude}`;

            const longitudeDiv = document.querySelector("#longitude");
            longitudeDiv.textContent = `Longitude: ${asJson.longitude}`;

            const timeDiv = document.querySelector("#time");
            timeDiv.textContent = `Time: ${asJson.current_weather.time}`;

            const temperatureDiv = document.querySelector("#temperature");
            temperatureDiv.textContent = `Temperature: ${asJson.current_weather.temperature} ${asJson.current_weather_units.temperature}`;
            
            const daytimeDiv = document.querySelector("#daytime");
            daytimeDiv.textContent = `Daytime: ${asJson.current_weather.is_day ? "Yes" : "No"}`;
        }
    };
    xhttp.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${currentX}&longitude=${currentY}&current_weather=true`, true);
    xhttp.send();
}