// Requires JQuery.
$(document).ready(function() {

alert("Hello!");

    // Ajax Default Call.
    var data = 'sql=SELECT * FROM "39ca02ad-e4e4-4c4b-af17-d6696895864a" LIMIT 1';
    $.ajax({
        url: 'https://www.data.qld.gov.au/api/3/action/datastore_search_sql',
        data: data,
        dataType: 'jsonp',
        success: function(data) {

          if(data.success == true) {
            alert('Total results found: ' + data.length);

            for(var i=0; i < data.total; i++) {
              console.log(data[i]);
            }

          }


        }
    });

}); // End of AJAX



    // Time in n.
    var currentTime = new Date().getTime();

    // Retrieve Dataset from cache.
    var dataset = JSON.parse(localStorage.getItem('LGAROR'));
    var datasetExpiry = new Date(parseInt(localStorage.getItem('LGAROR_expiry'))).getTime();
    alert('Time: ' + currentTime + ' | ' + datasetExpiry);

    // Check if cache is valid.
    if(dataset && (currentTime - datasetExpiry) < 60000) {
        console.log("Source: localStorage.");
    } else {
        console.log("Source: AJAX call");

        // Pull from data.qld.gov.au.
        var data = {
			resource_id: "39ca02ad-e4e4-4c4b-af17-d6696895864a"
		}
		$.ajax({
			url: "https://data.qld.gov.au/api/3/action/datastore_search",
			data: data,
			dataType: "jsonp",
			cache: true,
			success: function(data) {
                console.log('Total results found: ' + data.result.total);
                localStorage.setItem("LGAROR", JSON.stringify(data));
                localStorage.setItem("LGAROR_expiry", currentTime);
			}
        });
        
    }