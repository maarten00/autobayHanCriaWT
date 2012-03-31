<?php
include_once 'dbConnect.php';
$jsonresult = array();

if ($_REQUEST["method"] == "getBrands") {
	if ($result = $mysqli -> query("SELECT DISTINCT Merk FROM autos")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "getModels") {
	$brand = $_REQUEST["brand"];
	if ($result = $mysqli -> query("SELECT DISTINCT Type FROM autos WHERE Merk='$brand'")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "getAllCars") {
	if ($result = $mysqli -> query("SELECT * FROM autos WHERE status !='verkocht' ORDER BY Merk")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "manageCars") {
	if ($result = $mysqli -> query("SELECT * FROM autos ORDER BY Merk")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "getCar") {
	$carId = $_REQUEST["carId"];
	if ($result = $mysqli -> query("SELECT * FROM autos WHERE Id='$carId'")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}
$jsonText = json_encode($jsonresult);
echo $jsonText;
?>
