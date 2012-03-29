<?php
include_once 'dbConnect.php';

if ($_REQUEST["method"] == "postReservation") {
	$query = $mysqli -> query("INSERT INTO Reservations (`carId`, `name`, `telephone`, `price`) VALUES ('1', 'Maarten', '0315617545', '1000')");
	mysqli_query($link, $query);
}
?>
