<?php

$csv = array_map("str_getcsv", file("simpsons_episodes.csv"));

//print_r($csv);

echo '
<table border="1">
    <tr>
        <th>Episode Title</th>
        <th>Original Air Date</th>
    </tr>
';

foreach($csv as $rowID => $row) {
    if($rowID > 0) {
        echo "
        <tr>
            <td>" . $row[1] . "</td>
            <td>" . $row[2] . "</td>
        </tr>
        ";
    }
}

echo '</table>';

?>