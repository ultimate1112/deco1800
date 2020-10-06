//Variables for the site.MODEL
var isLoading = true;
var dataset = [];
var lga = [];
var timeframe = [];

// Ajax query options.
// Date will revert to latest datapoint when retrieveTimeframe() is called.
var options = {
date: "NOV19",
lga: "Brisbane City Council",
};

//Processing code. CONTROLLER
$(document).ready(function() {
    console.log("Starting script.");

    $('.js-example-basic-single').select();

    // Configure Dropdown Boxes.
    retrieveLGA();
    retrieveTimeframe();
    
    // Request the data for default values.
    retrieveDataset();

    // Handle Input elements. --------------------------------------------
    $("#refresh").on("click", function() {
        showLoader();

        $('#lga').val(options['lga']);
        $('.js-example-basic-single').select2();


        $("#date").val(timeframe.length - timeframe.indexOf(options['date']));
        $("#dte").text(options['date']);

        // Pull data again.
        retrieveDataset();
    });

    $("#lga").change(function() {
        showLoader();

        // Skip if default.
        if($('#lga').val() == "...") {
            return;
        }

        // Pull data for specified LGA.
        options['lga'] = $('#lga').val();
        retrieveDataset();
    });

    $("#date").change(function() {
        showLoader();

        // Pull data for specified LGA.  
        var key = timeframe.length - $('#date').val();
        options['date'] = timeframe[key];

        $("#dte").text(options['date']);

        retrieveDataset();
    });


    // Finished initialization. Hide the loader.
    hideLoader();
    });


    // Show the loading spinner.
    function showLoader() {
        isLoading = true;

        $("body").removeClass("loaded");
        $("body").addClass("unloaded");

        setTimeout(function() {
            // Check if page / dataset has been loaded.
            if(isLoading == true 
                && ((!dataset || dataset.length <= 0)
            )) {
                console.log("Webpage loading timeout. Please refresh the page and try again.");
                alert("Something bad has happened. Please refresh the page and try again.");
            }
        }, 10000);
    }

    // Hide the loading spinner.
    function hideLoader() {
        isLoading = false;

        $("body").removeClass("unloaded");
        $("body").addClass("loaded");
    }

    // Update the view.
    function updateView() {
        var counter = 0;
        var firstKey = Object.keys(dataset)[0];

        // clear element.
        $("#result").empty();

        $.each(dataset[firstKey], function(offence, value) {
            if(counter >= 12) {
                return;
            }

            $("#result").append("<p>" + "Offence [" + offence + "]: " + value + "</p>");
            counter = counter + 1;
        });

        hideLoader();   // View is finished updating.
    }

    // Update the LGA Dropdown box.
    function updateLGA() {

        $('#lga').empty();

        $.each(lga, function(index, value) {

            $('#lga').append($('<option>', {
                value: value,
                text: value,
            }));
        });

        $('#lga').val(options['lga']);
        $('.js-example-basic-single').select2();
    }


    function updateTimeframe() {

        // Set to latest datapoint
        $("#date").attr('max', timeframe.length);

        options['date'] = timeframe[0];
        $("#date").val(timeframe.length - 0);

        $("#dte").text(options['date']);
    }

    /**
     * Retrieve Dataset.
     * @param: var options - AJAX Options.
     * @return var dataset - Data.
     */
    function retrieveDataset() {

        PrettyPrintJsonConsole(JSON.stringify(options,null,4));

        // AJAX Call.
        $.ajax({
            url: 'https://ufc02t01.uqcloud.net/anthony/search.php',
            data: options,
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                if(data != null) {
                    console.log("AJAX: Successfully retrieved results");

                    // Save to global variable.
                    dataset = data;
                    PrettyPrintJsonConsole(JSON.stringify(dataset,null,4));

                    updateView();
                }
            },
            error: function() {
                console.log("AJAX: Failed to retrieve results.");
            }
        });
    }


    function retrieveLGA() {
        // AJAX Call.
        $.ajax({
            url: 'https://ufc02t01.uqcloud.net/anthony/get_lga.php',
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                if(data != null) {
                    console.log("AJAX: Successfully retrieved results");

                    // Save to global variable.
                    lga = data;
                    PrettyPrintJsonConsole(JSON.stringify(lga,null,4));

                    updateLGA();
                }
            },
            error: function() {
                console.log("AJAX: Failed to retrieve results.");
            }
        });
    }

    function retrieveTimeframe() {
        // AJAX Call.
        $.ajax({
            url: 'https://ufc02t01.uqcloud.net/anthony/get_timeframe.php',
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                if(data != null) {
                    console.log("AJAX: Successfully retrieved results");

                    // Save to global variable.
                    timeframe = data;

                    updateTimeframe();
                }
            },
            error: function() {
                console.log("AJAX: Failed to retrieve results.");
            }
    });
}

//Visualisation of JSON in Console
/* Pulled from https://ourcodeworld.com/articles/read/112/how-to-pretty-print-beautify-a-json-string */
function PrettyPrintJsonConsole(json) {
if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, '\t');
}

var
    arr = [],
    _string = 'color:green',
    _number = 'color:darkorange',
    _boolean = 'color:blue',
    _null = 'color:magenta',
    _key = 'color:red';

json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var style = _number;
    if (/^"/.test(match)) {
        if (/:$/.test(match)) {
    style = _key;
        } else {
    style = _string;
        }
    } else if (/true|false/.test(match)) {
    style = _boolean;
    } else if (/null/.test(match)) {
    style = _null;
    }
    arr.push(style);
    arr.push('');
    return '%c' + match + '%c';
});

arr.unshift(json);

console.log.apply(console, arr);
}
