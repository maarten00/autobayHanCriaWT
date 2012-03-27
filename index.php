<?
session_start();
if(isset($_SESSION["myusername"])) {
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
			<?	if(checkLogin()) {
					echo '<p class="loggedInMsg"> Ingelogd als: ';
					echo $myusername;
					echo '<br /><a href="backend/logout.php">Uitloggen</a></p>';
				}?>
		</header>
		<nav>
			<a id="homeBtn">Home</a>
			<a id=allCarsBtn>Alle Auto's</a>
			<a id=carSelectBtn>Zoeken</a>
			<?if(!checkLogin()) {
	echo '
			<a id="loginBtn">Inloggen</a>';
} else {
	echo '
			<a id="controlPanelBtn">Beheerderspaneel</a>';
}?>
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
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non neque felis.
			Maecenas libero odio, dictum at vulputate eu, pellentesque et leo.
			In et arcu nulla. Integer sollicitudin lacus ac ante eleifend ac vehicula nibh tempus.
			Maecenas ut tincidunt odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
			per inceptos himenaeos. Sed aliquam congue malesuada. Duis aliquam mollis leo,
			sed cursus felis faucibus at. Maecenas sed leo nisi. Nulla facilisi.
			Maecenas vulputate, massa non bibendum accumsan, lectus velit tincidunt tortor, a porta elit dolor ac urna.
		</p>
		<div class="carSelector">
		</div>

		<div class="allCars">
			<table id="carList">
				<th>Merk</th>
				<th>Type</th>
				<th>Bouwjaar</th>
			</table>

		</div>
		<div class="carViewer">
		</div>
		<div class="controlPanel">
			
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
	if(isset($_SESSION["myusername"])) {
		return true;
	} else {
		return false;
	}
}?>
