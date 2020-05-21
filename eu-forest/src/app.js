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

let deckGL_overlay , GMAP;

async function getLayer(layer = 'all'){
  document.querySelector("body").classList.remove("loaded");
  let request = await fetch(`https://dataset-euforest.storage.googleapis.com/country_${layer}.json`);
  let data = await request.json();
  document.querySelector("body").classList.add("loaded");
  //console.log(data);
  return  await new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: data,
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

  GMAP = new google.maps.Map( MAP, {
    center:{ lat: 55.954573, lng: 14.350896},
    zoom: 3.6,
    minZoom: 3.5,
    maxZoom: 11,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: false,
    styles: map_styles
  });

  document.querySelector('button').classList.add('active');
  deckGL_overlay = new GoogleMapsOverlay();
  deckGL_overlay.setMap(GMAP);
  deckGL_overlay.setProps({ layers: [ await getLayer() ]});
}

async function changeLayer(){
  document.querySelectorAll('button.active').forEach( button => {
    button.classList.remove('active');
  });
  this.classList.add('active');
  let layer_id = this.textContent.toLowerCase().replace(/ /g,'');
  let layer =  await getLayer(layer_id);
  deckGL_overlay.setProps({ layers: [layer]});
  GMAP.setCenter({lat: +this.dataset.lat, lng : +this.dataset.lng});
  GMAP.setZoom(+this.dataset.zoom);
}

function appendCountry(country){
  let div = document.createElement("button");
  div.classList.add('country');
  div.setAttribute('data-lat' , country.lat);
  div.setAttribute('data-lng' , country.lng);
  div.setAttribute('data-zoom' , country.zoom);
  div.innerHTML = `<span>${country.name}</span>`;
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