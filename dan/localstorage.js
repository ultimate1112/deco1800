$(document).ready(function() {

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

        //TODO:Retrieve data here!!!      
    }

    // Continue with rest of code.


		// Store data into localStorage.
                localStorage.setItem("LGAROR", JSON.stringify(data));
                localStorage.setItem("LGAROR_expiry", currentTime);


});

