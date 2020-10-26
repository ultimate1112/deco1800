/**
 * Process dataset from PHP endpoints.
 * Loads data into sessionStorage for external use.
 */



 /**
  * Perform test of sessionStorage.
  * @return true if sessionStorage works,
  *         otherwise false if unusable.
  */
function testStorage() {
    var testKey = "test";
    var testVal = "showmethecrime";

    // Check if Storage exists.
    if (typeof(Storage) !== "undefined") {

        // Test storage of key-value.
        sessionStorage.setItem(testKey, testVal);
        if(sessionStorage.getItem(testKey) == testVal) {
            return true;
        }
    }
    return false;
}

/**
 * Initialize element events.
 */
function initEvents() {

    // 'Refresh' Button
    $("#refresh").on("click", function() {
        showLoader();

        var lga = sessionStorage.getItem('lga');
        var date = sessionStorage.getItem('date');
        var timeframe = sessionStorage.getItem('timeframe');

        // Update LGA Dropdown.
        $('#lga').val(lga);
        $('.js-example-basic-single').select2();

        // Update date range-slider.
        $("#date").val(timeframe.length - timeframe.indexOf(options['date']));
        $("#dte").text(options['date']);

        // Pull new data.
        retrieveDataset();
    });

    // 'LGA' (Local Government Area) Dropdown selection.
    $("#lga").change(function() {
        showLoader();

        // Skip if default.
        if($('#lga').val() == "...") {
            return;
        }

        // Pull data from input, and query new dataset.
        sessionStorage.setItem('lga', $('#lga').val());
        retrieveDataset();
    });

    $("#date").change(function() {
        showLoader();

        // Pull data from input, and query new dataset.  
        options['date'] = timeframe[timeframe.length - $('#date').val()];
        $("#dte").text(options['date']);

        retrieveDataset();
    });

}















/**
 * Load on page load.
 */
$(document).ready(function() {

    initEvents();
});
