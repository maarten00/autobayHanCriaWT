<?php
include_once 'dbConnect.php';

if ($_POST["method"] == "newCar") {
	$brand = $_POST["brand"];
	$model = $_POST["model"];
	$fuel = $_POST["fuel"];
	$capacity = $_POST["capacity"];
	$power = $_POST["power"];
	$year = $_POST["year"];
	$color = $_POST["color"];
	$photo = $_POST["photo"];
	$price = $_POST["price"];

	$query = $mysqli -> query("INSERT INTO autos(`merk`, `type`, `brandstof`, `motorinhoud`, `vermogen`, 
	`bouwjaar`, `kleur`, `fotoURL`, `vraagprijs`) 
VALUES ( '$brand', '$model', '$fuel', '$capacity', '$power', '$year', '$color', '$photo', '$price')");
	mysqli_query($link, $query);
}

if ($_POST["method"] == "carDelete") {
	//$carId = $_POST["reservationId"];
	$query = $mysqli -> query("DELETE FROM autos WHERE id='29'");
	mysqli_query($link, $query);
}
?>
