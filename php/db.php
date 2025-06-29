<?php
$servername = "sql312.infinityfree.com";
$username = "if0_38633530"; 
$password = "D6HNhAlBWrk2AYe";
$database = "if0_38633530_musciplayer";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
