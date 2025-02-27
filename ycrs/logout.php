<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_destroy();  // End session
    echo json_encode(["success" => true]);  // Return success message
    exit;
}
?>
