# GMAP JS API with deck.gl Scatterplot Layer

This example show the use of [Deck.gl](https://deck.gl) and Google Maps, the code consumes a collection of Berlin's Stations (bus, train, etc) and display all in a single Map.

## Running the app

To run the app on localhost, do the following:

1. Download or clone the repo.

2. Run `npm install` to download dependencies.

3. You can set your `GOOGLE_MAPS_API_KEY` directly in the code and run `npm start`. Or if you're in a Unix System you can run `GoogleMapsAPIKey="API_KEY_VALUE_HERE" npm start` all in a single line.

Your browser will open to `http://localhost:8080`.

## Documentation & resources

- [`GoogleMapsOverlay` deck.gl submodule docs](https://deck.gl/#/documentation/submodule-api-reference/deckgl-google-maps/overview)
- [Scatterplot Layer docs](https://github.com/visgl/deck.gl/blob/master/docs/layers/scatterplot-layer.md)

## Datasource

This demo get the data from a JSON file hosted in a [GCP Bucket](https://deutscher-transport.storage.googleapis.com/berlin.json).
The file was generated using the code [Hafas Find Station](https://github.com/derhuerst/hafas-find-stations) by [Jannis Derman](https://github.com/derhuerst)