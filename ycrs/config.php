<?php
$servername = "localhost";
$username = "root";  // Default XAMPP user
$password = "";  // No password for root user by default
$database = "ycrs_db";  // Our database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Enable UTF-8 support
$conn->set_charset("utf8mb4");

// Echo success message (for testing)
echo "Database Connected Successfully!";
?>
