<?php
$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password=""; // Mysql password 
$db_name="autobay"; // Database name 
$tbl_name="users"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

$mysqli = new mysqli($host, $username, $password, $db_name);
if($mysqli -> connect_errno) {
echo "Unable to connect: " . $mysqli -> connect_errno;
}
?>