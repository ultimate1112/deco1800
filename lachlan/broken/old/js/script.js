//main script file

setTimeout(function () {
    $("body").addClass("loaded");
}, 2000); // 2 second delay

$(document).ready(function () {
    var slqData = JSON.parse(localStorage.getItem("slqData"));

    if (slqData) {
        iterateRecords(slqData);
    }

    else {
        var data = {
            resource_id: "9eaeeceb-e8e3-49a1-928a-4df76b059c2d",
            limit: 50
        }

        $.ajax({
            url: "https://data.qld.gov.au/api/3/action/datastore_search",
            data: data,
            dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
            cache: true,
            success: function (data) {
                localStorage.setItem("slqData", JSON.stringify(data));
                iterateRecords(data);
            }
        });

    }


});