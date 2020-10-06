$(document).ready(function(){
    //"JavaScript is Enabled" Body Class
    $("body").addClass("js");

    // 'Compare' Button 
    $('#compare-btn').on('click', function(event){
        $(this).toggleClass('btn-checked');
        $('#fltr-location-2').toggleClass('d-none');
    });

    // Form Submit Button
    $('#submit-btn').on('click', function(event) {
        event.preventDefault();
    });
});