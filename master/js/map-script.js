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


    var markerGroup = L.layerGroup().addTo(myMap);
    var circle = new L.circleMarker({color: 'green', fillColor: '#f03', fillOpacity: 0.5, radius: 15 });

    //Drops a marker when user clicks on the map
    myMap.on('click', function (e) {
        markerGroup.clearLayers();
        // circle = new L.circleMarker(e.latlng, { color: 'blue', fillOpacity: 0.1, radius: 10 });
        // myMap.addLayer(circle);

        var radius = e.accuracy;

        L.marker(e.latlng).addTo(markerGroup)
            .bindPopup("Your nearest local government area is: " + radius).openPopup();

        console.log(e.latlng, "radius: " + radius+ "m");
    });

    //Drops a marker when the search bar is used
    searchControl.on("results", function (data) {
        markerGroup.clearLayers();


        for (var i = data.results.length - 1; i >= 0; i--) {
            searchResult = results.addLayer(L.marker(data.results[i].latlng)).addTo(markerGroup).openPopup("Your nearest local government area is: ");
            console.log(data.results[i].latlng);

        }
    });

    //Checks Geolocation of a user if permission is given
    myMap.locate({setView: true, maxZoom: 16});

    //Displays Geolocation of a user if permission is given
    function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng).addTo(markerGroup)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(markerGroup);
        console.log(e.latlng, "radius: " + radius+ "m");
    }

    //Displays a default location if permission is not given
    myMap.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
        var centerPt = new L.LatLng(-27.470125, 153.0251);
        myMap.flyTo([-27.470125, 153.0251], 6);
        L.marker(centerPt).addTo(markerGroup)
            .bindPopup("Default location: Brisbane").openPopup();

        console.log("Geolocation permission: denied, " +
            "Default local council: Brisbane, " + centerPt);
    }

    myMap.on('locationerror', onLocationError);
}

$(document).ready(function () {

    var data = {
        resource_id: "35ea936d-083e-4ad6-beab-e0fede2cd3a6",
        limit: 100
    }

    $.ajax({
        url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
        timeout: 1000,
        data: data,
        dataType: "jsonp",
        cache: true,
        success: function (results) {
            mapbox(results);
        }
    });
    collapseMap();
});

function collapseMap() {
    $("#vl").click(function(){
        $("#map").toggleClass("collapse");
        $("#map").toggleClass("beforeCollapse");
        if (($("#map").hasClass("collapse"))) {
            modifyBubbles("expand");
        } else {
            modifyBubbles("shrink");
        }
    });
    // alert("Collapse that shit")
}
