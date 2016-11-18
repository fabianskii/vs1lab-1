/* Dieses Skript wird ausgeführt, wenn der Browser index-a2.html lädt. */

// Befehle werden sequenziell abgearbeitet ...

/** 
 * "console.log" schreibt auf die Konsole des Browsers
 * Das Konsolenfenster muss im Browser explizit geöffnet werden.
 */
console.log("The script is going to start...");

// Es folgen einige Deklarationen, die aber noch nicht ausgeführt werden ...

/**
 * GeoTagApp Locator Modul
 */
var gtaLocator = (function GtaLocator() {
    // private members

    /**
     * Funktion spricht Geolocation API an.
     * Bei Erfolg Callback 'onsuccess' mit Position.
     * Bei Fehler Callback 'onerror' mit Meldung.
     * Callback Funktionen als Parameter übergeben.
     */
    var tryLocate = function (onsuccess, onerror) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onsuccess, function (error) {
                var msg;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        msg = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        msg = "An unknown error occurred.";
                        break;
                }
                onerror(msg);
            });
        } else {
            onerror("Geolocation is not supported by this browser.");
        }
    };

    // Auslesen Breitengrad aus der Position
    var getLatitude = function (position) {
        return position.coords.latitude;
    };

    // Auslesen Längengrad aus Position
    var getLongitude = function (position) {
        return position.coords.longitude;
    };

    // Hier Google Maps API Key eintragen
    var apikey = "";

    // Falls Map geladen werden soll, muss oben API Key angegeben sein
    var getLocationMapSrc = function (position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        return "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon
            + "&markers=%7Clabel:you%7C" + latlon + "&zoom=13&size=400x300&sensor=false" +
            "&key=" + apikey;
    };

    // public members
    return {
        readme : "Dieses Objekt enthält 'öffentliche' Teile des Moduls.",
        updateLocation : function() { 
            // Hier Inhalt der Funktion "updateLocation" ergänzen
        }
    }
})();

/**
 * $(document).ready wartet, bis die Seite komplett geladen wurde. Dann wird die 
 * angegebene Funktion aufgerufen. An dieser Stelle beginnt die eigentliche Arbeit
 * des Skripts.
 */
$(document).ready(function () {
    alert("Hello World")
    // Hier Event Listener für Button Click registrieren
});
