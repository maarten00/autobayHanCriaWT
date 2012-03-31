<?
session_start();
if (isset($_SESSION["myusername"])) {
	$myusername = $_SESSION["myusername"];
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Autobay</title>
		<meta name="description" content="" />
		<meta name="author" content="Maarten Kuiper" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="style/style.css" />
		<script src="scripts/functions.js"></script>
		<script src="libs/jquery-1.7.1.js"></script>
	</head>
	<body onload="attachHandlers()">
		<header>
			<h1>Autobay</h1>
			<?
			if (checkLogin()) {
				echo '<p class="loggedInMsg"> Ingelogd als: ';
				echo $myusername;
				echo '<br /><a href="backend/logout.php">Uitloggen</a></p>';
			}
			?>

			<input type="hidden" name="loginValue" id="loginValue" value="<?php echo checkLogin();?>" />
		</header>
		<nav>
			<a id="homeBtn">Home</a>
			<a id=allCarsBtn>Alle Auto's</a>
			<a id=carSelectBtn>Zoeken</a>
			<?
			if (!checkLogin()) {
				echo ' <a id="loginBtn">Inloggen</a>';
			} else {
				echo ' <a id="controlPanelBtn">Beheerderspaneel</a>';
			}
			?>
		</nav>
		<div id="content">
			<div class='login-form'>
				<h1>Login Form</h1>
				<form action="backend/checkcredentials.php" method="post">
					<input type="text" name="username" placeholder="username">
					<input type="password" name="password" placeholder="password">
					<input type="submit" value="Login">
				</form>
			</div>
		</div>
		<p class="homeText">
			Welkom op Autobay. 
			Bij alle auto's vindt u de auto's die op dit moment te koop zijn. Bij interesse is het mogelijk om
			een auto te reserveren. <br />
			Bij het reserveren is het de bedoeling dat u contactgevens en een prijs achterlaat.
			Wij zullen daarna contact met u opnemen. 
		</p>
		<div class="carSelector"></div>
		<div class="allCars">
			<table id="carList">
				<tr>
					<th>Merk</th>
					<th>Type</th>
					<th>Bouwjaar</th>
				</tr>
			</table>
		</div>
		<div class="carViewer">
			<?
			if (checkLogin()) {
				echo '<fieldset id=carReservations><legend>Reserveringen</legend>';
				echo '<table id="carReservationsTable">';
				echo '<th>Prijs</th><th>Naam</th><th>Telefoonnummer</th><th>Tijd En Datum</th>';
				echo '</table></fieldset>';
			}
			?>
		</div>
		<div class="controlPanel">
			<table id="reservationsTable">
				<th>AutoId</th><th>Prijs</th><th>Naam</th><th>Telefoonnummer</th><th>Tijd En Datum</th>
			</table>
		</div>
		<footer>
			<p>
				&copy; Copyright  by Maarten Kuiper
			</p>
		</footer>
	</body>
</html>
<?
function checkLogin() {
	if (isset($_SESSION["myusername"])) {
		return true;
	} else {
		return false;
	}
}
?>
