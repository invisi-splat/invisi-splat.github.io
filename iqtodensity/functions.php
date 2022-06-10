<?php
function scanthru($i_density, $tolerance) {
  $m_distance = 0;
  $closest = "";
  $closeness = 0.0;
  $tempcounter = 0;
  $data = fopen("./data/jsondata.json", "r");
  $data = fread($data, filesize("./data/jsondata.json"));
  $data = json_decode($data, true);
  foreach ($data as $object => $t_density) {
    $c_distance = abs($i_density - $t_density);
    if ($tempcounter === 0) {
      $m_distance = $c_distance;
      $closest = $object;
      $closeness = round((($m_distance / $t_density) * 100), 2);
      $tempcounter += 1;
    } elseif ($c_distance < $m_distance) {
      $m_distance = $c_distance;
      $closest = $object;
      $closeness = round((($m_distance / $t_density) * 100), 2);
    } elseif ($c_distance === $m_distance) {
      $closest .= ", $object";
    };
  };
  if ($closest !== "") {
    if ($closeness <= $tolerance) {
      return array("success" => true, "density" => $i_density, "closest" => $closest, "closeness" => $closeness);
    } else {
      return array("success" => false, "density" => $i_density, "tolerance" => $tolerance);
    };
  };
};

function iqtodensity($iq, $tolerance) {
  $density = 35000 / (pow(floatval($iq), 2.2));
  $results = scanthru($density, $tolerance);
  $density = round($density, 2);
  if ($results["success"] === true) {
    echo "Calculated density: {$density}g/cm<sup>3</sup><br />You are about as dense as {$results['closest']} (within {$results['closeness']}%).";
  } else {
    echo "Calculated density: {$density}g/cm<sup>3</sup><br />Your density is not within {$results['tolerance']}% of any material within the database.";
  };
};
?>
