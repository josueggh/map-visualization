import {map_styles} from './map_styles';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {ScatterplotLayer} from '@deck.gl/layers';
import {colors} from './colors';
import {countries} from './countries';

const YOUR_API_KEY = '',
      HEAD      = document.querySelector('head'),
      SCRIPT    = document.createElement('script'),
      COUNTRIES = document.getElementById('countries'),
      MAP       = document.getElementById('map');

let deckGL_overlay;

function getLayer(layer = 'all'){
  return  new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: `https://map-visualisations.storage.googleapis.com/country_${layer}.json`,
    pickable: true,
    opacity: 1,
    stroked: false,
    filled: true,
    radiusScale: 20,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => [d.lng, d.lat] ,
    getRadius: d => 50,
    getFillColor: d => colors[d.specie],
    getLineColor: d => [30, 30, 30],
  });
}

async function init() {
  await loadScript();

  const GMAP = new google.maps.Map( MAP, {
    center:{ lat: 55.954573, lng: 14.350896},
    zoom: 3.6,
    minZoom: 3.5,
    maxZoom: 11,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: false,
    styles: map_styles
  });

  deckGL_overlay = new GoogleMapsOverlay();
  deckGL_overlay.setMap(GMAP);
  deckGL_overlay.setProps({ layers: [ getLayer() ]});
}

function changeLayer(){

}

function appendCountry(country){
  let div = document.createElement("button");
  div.classList.add('country');
  div.innerHTML = `<span>${country}</span>`;
  div.addEventListener('click', changeLayer);
  COUNTRIES.appendChild(div);
}

// Load the Google Maps Platform JS API async
function loadScript() {
  const GOOGLE_MAPS_API_KEY = YOUR_API_KEY || process.env.GoogleMapsAPIKey,
    GOOGLE_MAPS_API_URI = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

  SCRIPT.type = 'text/javascript';
  SCRIPT.src = GOOGLE_MAPS_API_URI;
  HEAD.appendChild(SCRIPT);

  countries.map( country => appendCountry(country) )

  return new Promise(resolve => {
    SCRIPT.onload = resolve;
  });
}

init();