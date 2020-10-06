<?php

// Parameters.
$start = '';
$end = '';

// Parse GET.
if(!empty($_GET['start'])) {
    // Sanitize.
    $str = filter_var($_GET['start'], FILTER_SANITIZE_STRING);
    $start = strtotime($str);
} else {
    // Default to JAN00 (01/01/2000).
    $start = strtotime("01-01-2000");
}

if(!empty($_GET['end'])) {
    // Sanitize.
    $str = filter_var($_GET['end'], FILTER_SANITIZE_STRING);
    $end = strtotime($str);
} else {
    // Default to current time.
    $end = time();
}

// -------------------------------------------------------------

$timeframe = array();   // Array of month identifiers.

// Compile array of each month between $start and $end.
$last = strtotime("first day of next month 00:00:00 - 1 second", $end);   // End of month for $end.
while($start < $last) {
    // Each month format as "OCT20".
    array_push($timeframe, strtoupper(date("My", $start)));
    $start = strtotime("+1 month", $start);
}

header('Content-type: text/javascript');
echo json_encode($return_arr);
//echo json_encode($return_arr, JSON_PRETTY_PRINT);

?>