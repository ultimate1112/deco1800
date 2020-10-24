/**
 * JS Functionality specific to filter.html
 */

/**
 * Initialize element events.
 */
function initEvents() {

    // 'Compare' Button
    $('#compare-btn').on('click', function(event){
        $(this).toggleClass('btn-checked');
        $('#fltr-location-2').toggleClass('d-none');
    });

    // Form Submit Button
    $('#submit-btn').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('btn-checked');
    });
}


/**
 * Load on page load.
 */
$(document).ready(function() {

    initEvents();
});