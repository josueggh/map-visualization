import {map_styles} from './map_styles';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {ScatterplotLayer} from '@deck.gl/layers';
import {colors} from './colors';
const YOUR_API_KEY = '';

function getLayer() {
  const LAYER = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: `https://map-visualisations.storage.googleapis.com/country_all.json`,
    pickable: true,
    opacity: 1,
    stroked: false,
    filled: true,
    radiusScale: 5,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => [d.lng, d.lat] ,
    getRadius: d => 30,
    getFillColor: d => colors[d.specie],
    getLineColor: d => [30, 30, 30],
  });
  return LAYER;
}

async function init() {
  await loadScript();
  const MAP = new google.maps.Map( document.getElementById('map'), {
    center:{ lat: 50.954573, lng: 14.350896},
    zoom: 3,
    minZoom: 3,
    maxZoom: 11,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: false,
    styles: map_styles
  });

  const LAYER = getLayer();
  const overlay = new GoogleMapsOverlay({ layers: [LAYER] });
  overlay.setMap(MAP);
}

// Load the Google Maps Platform JS API async
function loadScript() {
  const GOOGLE_MAPS_API_KEY = YOUR_API_KEY || process.env.GoogleMapsAPIKey,
    GOOGLE_MAPS_API_URI = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
    HEAD = document.querySelector('head'),
    SCRIPT = document.createElement('script');

  SCRIPT.type = 'text/javascript';
  SCRIPT.src = GOOGLE_MAPS_API_URI;
  HEAD.appendChild(SCRIPT);
  return new Promise(resolve => {
    SCRIPT.onload = resolve;
  });
}

init();