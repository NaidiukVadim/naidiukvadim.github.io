let watchId = null;
let map = null;
const ourCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
        const watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        
        const clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;

        const btnGoToDest = document.getElementById("btnGoToDest");
        btnGoToDest.onclick = goToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let accuracy = position.coords.accuracy;
    
    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += ` (with ${accuracy} meters accuracy)`;

    let km = computeDistance(position.coords, ourCoords);
    let distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = `You are ${km} km from the College`;

    updateMap(latitude, longitude, accuracy);
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
    Math.cos(startLatRads) * Math.cos(destLatRads) *
    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI) / 180;
    return radians;
}

function updateMap(lat, lng, acc) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.setView([lat, lng]);
    }

    const timestamp = new Date().toLocaleTimeString();
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`You are here.<br>Lat: ${lat}<br>Lng: ${lng}<br>Time: ${timestamp}`)
        .openPopup();

    L.circle([lat, lng], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.1,
        radius: acc
    }).addTo(map);
}

function goToDestination() {
    let destLat = parseFloat(document.getElementById("destLat").value);
    let destLng = parseFloat(document.getElementById("destLng").value);

    if (isNaN(destLat) || isNaN(destLng)) {
        alert("Please enter valid coordinates");
        return;
    }

    if (!map) {
        map = L.map('map').setView([destLat, destLng], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.flyTo([destLat, destLng], 15);
    }

    L.marker([destLat, destLng]).addTo(map)
        .bindPopup(`Destination<br>Lat: ${destLat}<br>Lng: ${destLng}`)
        .openPopup();
}