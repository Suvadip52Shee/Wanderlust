mapboxgl.accessToken = window.mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    center: window.coordinates,
    zoom: 6,
});

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(window.coordinates)
    // .setPopup(new mapboxgl.Popup({offset: 25})).setHTML("<h4>Exact location provided after booking</h4>")
    .addTo(map);