<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yoga_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON input from frontend
$data = json_decode(file_get_contents("php://input"), true);

$class_id = $data['class_id'];
$user_name = $data['user_name'];
$email = $data['email'];

if (!$class_id || !$user_name || !$email) {
    echo "Error: Unauthorized request!";
    exit;
}

// Insert enrollment into database
$sql = "INSERT INTO enrollments (class_id, user_name, email) VALUES ('$class_id', '$user_name', '$email')";
if ($conn->query($sql) === TRUE) {
    echo "Enrollment successful!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
