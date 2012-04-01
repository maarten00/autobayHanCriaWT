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
	`bouwjaar`, `kleur`, `fotoURL`, `vraagprijs`, `status`) 
VALUES ( '$brand', '$model', '$fuel', '$capacity', '$power', '$year', '$color', '$photo', '$price', 'Aangeboden')");
	mysqli_query($link, $query);
}

if ($_POST["method"] == "carDelete") {
	$carId = $_POST["carId"];
	$query = $mysqli -> query("DELETE FROM autos WHERE id='$carId'");
	mysqli_query($link, $query);
}
?>
