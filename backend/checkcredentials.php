<?php
ob_start();
include_once 'dbConnect.php';

// Define $myusername and $mypassword 
$myusername=$_POST['username']; 
$mypassword=$_POST['password'];

// To protect MySQL injection
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);
$encrypted_password = md5($mypassword);

$sql="SELECT * FROM $tbl_name WHERE username='$myusername' and password='$encrypted_password'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
// Register $myusername, $mypassword and redirect to index
session_register("myusername");
session_register("mypassword"); 
header("location:../index.php");
}
else {
echo "Wrong Username or Password";
}

ob_end_flush();
?>