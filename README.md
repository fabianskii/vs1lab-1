# VS1lab - Laborübungen Verteilte Systeme 1 (Winter 2016)
Ziel des Labors ist die praktische Anwendung verschiedener Web Technologien aus der Vorlesung. Dazu wird in mehreren Schritten eine komplette Web Anwendung erstellt. In jedem Schritt wird jeweils eine Technik genauer betrachtet.

## Die Geo Tagging App (GTA)
Die *Geo Tagging App* verwaltet *GeoTags* (= Locations mit Hashtags). Dies beinhaltet *Tagging* und *Discovery* von GeoTags.

Über ein *Tagging Widget* (Formular) kann jederzeit der Name sowie ein Hashtag für den aktuellen Ort des Browsers (oder manuell eingegebene Koordinaten) registriert werden.

In einer *Discovery Liste* werden die GeoTags der aktuellen Umgebung angezeigt. GeoTags der Umgebung können zudem über Name oder Hashtag gefiltert werden.

## Entwicklungsumgebung
Auf ihrem Entwicklungsrechner brauchen sie zur Lösung der Aufgaben verschiedene Tools und Frameworks. Für die ersten zwei Aufgaben sind folgende Komponenten nötig:

- Eine **IDE** oder einen **Editor** ([Webstorm](https://www.jetbrains.com/webstorm/), [Nodeclipse](http://www.nodeclipse.org), [Atom](https://atom.io) etc.)
- Einen **Browser** (nach Belieben Chrome, Firefox, Safari etc.)
- Möglichst [**git**](https://help.github.com/articles/set-up-git/) als **Version Control System** (VCS)

Ab der dritten Aufgabe kommen folgende Frameworks hinzu:

- [**Node.js Plattform**](https://nodejs.org) (inkl. npm)
- [**Express Framework**](http://expressjs.com) (inkl. Express-Generator)

Alle Komponenten sind auf den Poolrechnern (LI 137) vorhanden.

## 1.Aufgabe - Struktur einer Webanwendung mit HTML5 erstellen
In der ersten Aufgabe soll die Struktur der GT-App als HTML-Seite entstehen.

- Die App soll alle Funktionen auf *einer* Seite kombinieren (**Single Page App**) und sich in **Header-** **Main-** und **Footer-Bereich** gliedern. Im Hauptteil soll ein **Tagging Widget** und ein **Discovery Widget** enthalten sein.
- Das Tagging Widget fragt über ein	**Formular** die `latitude`, `longitude`, `name` und `hashtag` eines neuen GeoTags ab.
- Das Discovery Widget zeigt in einer **Tabelle** und einer **Karte** die GeoTags der Umgebung an. Über ein **Formular** kann ein `searchterm` eingegeben werden, um die Locations zu filtern.

### 1.1. Vorbereitung
Für die Seite existiert schon ein Template auf github: [https://github.com/zirpins/vs1lab](https://github.com/zirpins/vs1lab).

1. Laden sie das Template von **github** herunter.
2. Öffnen sie `Aufgabe1_html/index.html` in ihrem **Editor** und in Ihrem **Browser**.

### 1.2. Teilaufgaben
#### Formularstruktur
Im Template fehlen noch die Formulare. Diese sollen nun erstellt werden.

- Ergänzen sie geeignete `Input` Elemente im Tagging-Formular und im Discovery-Formular.
- Vergeben sie eindeutige `id` Attribute für die Felder, um sie später in JavaScript finden zu können.
- Deklarieren sie für alle Felder jeweils ein `label`.
- Verwenden sie `fieldset` und `legend` zur Begrenzung des Formulars.
- Deklarieren sie einen `button` mit  `id="update"` im Tagging-Widget, der später die Koordinaten aktualisieren soll. Dieser Knopf hat zunächst *keine* Funktion.
- Deklarieren sie für jedes Formular einen `button` zum Submit.
- Fügen sie als Hilfe für die Benutzer Beispiel Platzhalter in die Felder ein.

#### Formularvalidierung
Für die Formulare soll nun noch eine Validierung definiert werden. Diese Validierung soll nur HTML-Attribute verwenden.

Setzen sie folgende Regeln um:

- Alle Felder bis auf den Hashtag müssen in den Formularen ausgefüllt werden.
- Namen dürfen 10 Buchstaben lang sein.
- Hashtags müssen mit `#` beginnen und dürfen dann noch 10 Buchstaben haben.

## 2.Aufgabe - JavaScript / HTML5 APIs
In der zweiten Aufgabe soll die Position des Browsers mit JavaScript abgefragt und in das Formular aus Aufgabe 1 eingetragen werden. Es wird dazu die **HTML5 GeoLocationAPI** verwendet. Optional kann mit der **Google Maps API** eine Karte angezeigt werden.

Die Aufgabe vertieft die Programmierung von **Modulen** und **Callbacks** sowie **DOM Manipulation** mit JavaScript.

### 2.1. Vorbereitung
Für die Seite existiert schon ein Template auf github: [https://github.com/zirpins/vs1lab](https://github.com/zirpins/vs1lab).

1. Öffnen sie `Aufgabe2_javascript/index-a2.html` in ihrem Editor und in Ihrem Browser. Übernehmen sie hier ihre Lösung von Aufgabe1 (nur die Formulare; die `<script>` Tags müssen erhalten bleiben).
2. Öffnen sie `Aufgabe2_javascript/script-a2.js` in ihrem Editor.

### 2.2. Teilaufgaben
#### Koordinaten in das Formular eintragen
Das JavaScript enthält ein Modul `gtaLocator` mit Funktionen zur Abfrage der GeoLocationAPI und zur Verwendung der resultierenden `position`.

Die Funktion `tryLocate` nimmt als Parameter zwei Callback Funktionen an, die bei Erfolg mit der Position oder bei Fehler mit einer Meldung 'zurückgerufen' werden. Zur Verwendung der Funktion müssen beide Callback Funktionen übergeben werden.

Fügen sie eine _öffentliche_ Funktion `updateLocation` zum Modul `gtaLocator` hinzu, die folgendes tut:

- Auslesen der Position mit `tryLocate`
- Im Erfolgsfall `latitude` und `longitude` Felder des Tagging-Formulars suchen und in deren `value` Attribute Koordinaten schreiben.
- Im Fehlerfall ein `aler` öffnen und Fehlernachricht ausgeben.

Registrieren sie nach dem Laden des Dokuments einen Event Listener für den `update` Button des Tagging-Formulars, der wiederum als Callback `updateLocation` aufruft.

#### Karte aktualisieren (optional)
Um die Karte zu aktualisieren, benötigen sie einen API Schlüssel für die [Google Static Maps API](https://developers.google.com/maps/documentation/static-maps/) (kostenlos). Besorgen sie sich einen Key und tragen sie diesen im `gtaLocator` Modul im privaten Feld `apikey` ein.

Ergänzen sie `updateLocation` wie folgt:

- Rufen sie die Funktion `getLocationMapSrc` auf. Das Ergebnis ist eine URL, mit der man die Karte als Bild laden kann.
- Suchen sie das Image Element auf der Webseite.
- Ändern sie das `src` Attribut auf die neue URL.

## 3.Aufgabe - Node.js / Express Anwendung erstellen
Die dritte Aufgabe beschäftigt sich mit dem **GTA-Server**. Zum einen stellt der Server **statische Dateien** zum Abruf per HTTP zur Verfügung. Dazu gehören momentan Bilder, ein clientseitiges Skript sowie das HTML Grundgerüst der Single Page App. Zum anderen speichert der GTA-Server alle Geo Tags und erlaubt das Abfragen und Hinzufügen von **Geo Tags in JSON Format**. 

Die Aufgabe besteht darin, ein serverseitiges JavaScript zu erstellen, das den GTA-Server auf Basis von Node.js und Express realisiert.

### 3.1. Vorbereitung
Auch für die Web App existiert ein Grundgerüst auf github: [https://github.com/zirpins/vs1lab](https://github.com/zirpins/vs1lab). Falls Sie git benutzen, laden Sie das Repository herunter (`git clone https://github.com/zirpins/vs1lab`) oder aktualisieren Sie ihre lokale Kopie (`git pull`).

1. Öffnen sie `Aufgabe3_nodejs/gta-server.js` in ihrem **Editor**.
2. Führen sie `npm install` im Verzeichnis `Aufgabe3_nodejs` aus um die nötigen Module zu laden und zu installieren.
3. Führen sie `npm start` im Verzeichnis `Aufgabe3_nodejs` aus und öffnen sie [http://localhost:3000](http://localhost:3000).
3. Beachten sie auch die anderen Dateien im Ordner `Aufgabe3_nodejs`, insb. 'public/index.html' und 'public/javascripts/geotagging.js'.

### 3.2. Teilaufgaben

Die Teilaufgaben basieren alle auf der Verfvollständigung einzelner Teile im Server Script `Aufgabe3_nodejs/gta-server.js`. Die Anforderungen stehen jeweils als Kommentare im Sourcecode. Hier sind auch Hinweise auf relevante Stellen in der Express Dokumentation enthalten. Im einzelnen gibt es folgende Teilaufgaben:

- Statische Dateien bereitstellen
- Konstruktor für Geo Tag Objekte erstellen
- Funktionen für die Verwaltung und Suche von Geo Tag Objekten erstellen
- Eine Route zur Abfrage von Geo Tags erstellen
- Eine Route zur Specherung von Geo Tags erstellen

## 4.Aufgabe - Webanwendung mit CSS3 und Bootstrap gestalten
## 5.Aufgabe - Refactoring: REST API und AJAX Aufrufe
## 6.Aufgabe - Benutzer über Twitter anmelden
