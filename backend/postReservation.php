<?php
include_once 'dbConnect.php';

if ($_POST["method"] == "postReservation") {
	$carId = $_POST["carId"];
	$name = $_POST["name"];
	$telephone = $_POST["telephone"];
	$price = $_POST["price"];

	$query = $mysqli -> query("INSERT INTO Reservations (`carId`, `name`, `telephone`, `price`) VALUES ('$carId', '$name', '$telephone', '$price')");
	mysqli_query($link, $query);
}
?>
