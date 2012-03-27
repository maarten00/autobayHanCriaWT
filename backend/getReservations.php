<?php
include_once 'dbConnect.php';
$jsonresult = array();

if ($_REQUEST["method"] == "getAllReservations") {
	if ($result = $mysqli -> query("SELECT * FROM reservations")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "getCarReservations") {
	$carId = $_REQUEST["carId"];
	if ($result = $mysqli -> query("SELECT * FROM reservations WHERE carId='$carId'")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

$jsonText = json_encode($jsonresult);
echo $jsonText;
?>
