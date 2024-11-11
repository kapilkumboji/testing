<?php
header('Content-Type: application/json');

// Handle CORS for local development
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$email = $data['email'];
$phone = $data['phone'];
$password = $data['password'];

// Simple database connection
$mysqli = new mysqli("localhost", "root", "", "service_app");

if ($mysqli->connect_error) {
    die(json_encode(["message" => "Failed to connect to database"]));
}

// Simple insert query (ensure to hash the password)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $mysqli->prepare("INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $email, $phone, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["message" => "Registration failed"]);
}

$stmt->close();
$mysqli->close();
?>
