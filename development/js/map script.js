
function mapbox(results) {
    console.log(results);
    var myMap = L.map("map").setView([-25, 135], 4);
    var tiles = L.esri.basemapLayer("Streets").addTo(myMap);
    var results = L.layerGroup().addTo(myMap);
    myMap.options.minZoom = 4;
    myMap.options.maxZoom = 15;

    //Obtain personalised token for Major Project
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFhbm0iLCJhIjoiY2tmcTJ3cnB3MGdhbTJ5cWpnY2ltZ2l0MCJ9.M7_7ZzSK3Q9LUimKk3OvVw", {
        attribution: 'Map data © href="https://www.openstreetmap.org/">OpenStreetMap contributors, href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA, Imagery © href="https://www.mapbox.com/">Mapbox',
        maxZoom: 15,
        // Change the style of map to either street or satellite view
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
    }).addTo(myMap);

    //Search bar icon
    var searchControl = L.esri.Geocoding.geosearch().addTo(myMap);


    // var layerGroup = L.layerGroup().addTo(myMap);
    var circle = new L.circleMarker({color: 'green', fillColor: '#f03', fillOpacity: 0.5, radius: 15 });

    myMap.on('click', function (e) {
        myMap.removeLayer(circle);
        results.clearLayers();
        circle = new L.circleMarker(e.latlng, { color: 'blue', fillOpacity: 0.1, radius: 10 });
        myMap.addLayer(circle);
    });

    //Restrict Search By Country Code 
    function searchCode() {
        L.Control.geocoder().addTo(myMap);
        L.Control.geocoder()({
            geocoder: L.Control.Geocoder.nominatim({
                geocodingQueryParams: { countrycodes: 'au' }
            })
        }).addTo(myMap)
    }

    searchControl.on("results", function (data) {
        myMap.removeLayer(circle);
        results.clearLayers();


        for (var i = data.results.length - 1; i >= 0; i--) {
            searchResult = results.addLayer(L.circleMarker(data.results[i].latlng))
        }
    });

    // var geocoder = L.Control.Geocoder.nominatim({ geocode: 'countrycodes=au' });
    // if (URLSearchParams && location.search) {
    //     // parse /?geocoder=nominatim from URL
    //     var params = new URLSearchParams(location.search);
    //     var geocoderString = params.get('geocoder');
    //     if (geocoderString && L.Control.Geocoder[geocoderString]) {
    //         console.log('Using geocoder', geocoderString);
    //         geocoder = L.Control.Geocoder[geocoderString]();
    //     } else if (geocoderString) {
    //         console.warn('Unsupported geocoder', geocoderString);
    //     }
    // }
    
    myMap.locate({setView: true, maxZoom: 16});

}


$(document).ready(function () {

    var data = {
        resource_id: "35ea936d-083e-4ad6-beab-e0fede2cd3a6",
        limit: 100
    }

    $.ajax({
        url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true,
        success: function (results) {
            mapbox(results);
        }
    });
});
