/* Dieses Skript wird ausgeführt, wenn der Browser index.html lädt. */
console.log("The script is going to start...");

/**
 * GeoTagApp Locator and Mapper Module
 */
var gtaLocator;
gtaLocator = (function GtaLocator(lat_id, lon_id, map_id) {

    // Konfigurierbare HTML-Element-IDs
    var lat_id = "#" + lat_id;
    var lon_id = "#" + lon_id;
    var map_id = "#" + map_id;

    // Caches für Koordinaten
    var latitude;
    var longitude;

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

    // Hier Google Maps API Key eintragen
    var apikey = "YOUR API KEY HERE";

    // Falls Map geladen werden soll, muss oben API Key angegeben sein
    var getLocationMapSrc = function (lat, lon, tags, zoom) {
        if (apikey == "YOUR API KEY HERE")
            return "images/mapview.jpg";
        var taglist = "";
        tags.forEach(function (tag) {
            taglist += "&markers=%7Clabel:" + tag.name + "%7C"
                + tag.latitude + "," + tag.longitude;
        });
        urlstring = "http://maps.googleapis.com/maps/api/staticmap?center="
            + lat + "," + lon + "&markers=%7Clabel:you%7C" + lat + "," + lon
            + taglist + "&zoom=" + zoom + "&size=640x480&sensor=false"
            + "&key=" + apikey;
        console.log("Generated Maps Url: " + urlstring);
        return urlstring
    };

    // Aktualisert Koordinaten im Tagging Formular
    var updateTaggingForm = function () {
        var e1 = $(lat_id);
        e1.attr("value", latitude);
        var e2 = $(lon_id);
        e2.attr("value", longitude);
    };

    // Aktualisiert die Discovery Ergebnisse
    var updateDiscovery = function (filter) {
        $.getJSON("/geotags", {
            lat: latitude,
            lon: longitude,
            searchterm: filter
        }, function (tags) {
            $(map_id).attr("src", getLocationMapSrc(latitude, longitude, tags, 10));
            var $results = $("#results");
            $results.children().detach();
            tags.forEach(function (tag) {
                $results.append($("<li>" + tag.name + " (" + tag.latitude + ", " + tag.longitude + ") " + tag.hashtag + "</li>"));
            });
        });
    };

    return {
        // public members
        update: function (filter) {
            if (latitude == undefined || longitude == undefined) {
                tryLocate(function (position) {
                    console.log("Position found: " + position);
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    updateTaggingForm();
                    updateDiscovery(filter);
                }, function (err) {
                    alert(err)
                })
            } else {
                updateDiscovery(filter);
            }
        }
    }
})("latitude", "longitude", "result-img");

$(document).ready(function () {
    gtaLocator.update();

    $("#filter-submit").on("click", function () {
        var term = $("#filter-term").val();
        if (term != undefined) {
            gtaLocator.update(term);
        }
    });

    $("#filter-remove").on("click", function () {
        gtaLocator.update();
    })
});
