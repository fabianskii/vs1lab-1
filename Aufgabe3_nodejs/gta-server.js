#!/usr/bin/env node

/**
 * Definiere Modul Abhängigkeiten und erzeuge Express app.
 */

var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

/**
 * Konfiguriere den Pfad für statische Dateien.
 * Teste das Ergebnis im Browser unter 'http://localhost:3000/'.
 */

// TODO: CODE ERGÄNZEN

/**
 * Konstruktor für GeoTag Objekte.
 * GeoTag Objekte sollen min. alle Felder des 'tag-form' Formulars aufnehmen.
 */

// TODO: CODE ERGÄNZEN

/**
 * Array als Speicher für Geo Tags.
 * Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * Funktion zur Suche von Geo Tags nach Suchbegriff.
 * Funktion zum hinzufügen eines Geo Tags.
 * Funktion zum Löschen eines Geo Tags.
 */

// TODO: CODE ERGÄNZEN

/**
 * Route mit Pfad '/geotags' für HTTP 'GET' Requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * URLs enthalten Query Parameter für 'lat', 'lon' und 'term'.
 * (siehe http://expressjs.com/de/4x/api.html#req.query)
 *
 * Im Response wird ein JSON Array mit Geo Tag Objekten gesendet.
 * Die Objekte liegen in einem Standard Radius um die Koordinate (lat, lon).
 * Falls 'term' vorhanden ist, wird nach Suchwort gefiltert.
 */

// TODO: CODE ERGÄNZEN

/**
 * Route mit Pfad '/geotags' für HTTP 'POST' Requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests enthalten im Body die Felder des 'tag-form' Formulars.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Mit den Formulardaten wird ein neuer Geo Tag erstellt und gespeichert.
 *
 * Am Ende leitet die Route den Aufruf auf die Standard Page um.
 * (http://expressjs.com/de/4x/api.html#res.redirect)
 */

// TODO: CODE ERGÄNZEN

/**
 * Setze Port und speichere in Express.
 */

var port = 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
