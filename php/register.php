<?php
// connect to MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Register";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// get form data
$username = mysqli_real_escape_string($conn, $_POST['username']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
$confirm_password = mysqli_real_escape_string($conn, $_POST['confirm-password']);

// validate form data
if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
    echo "Please fill all fields";
} else if ($password != $confirm_password) {
    echo "Passwords do not match";
} else {
    // hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // insert user information into database
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";
    if (mysqli_query($conn, $sql)) {
        // show success message
        echo "Registration successful";
    } else {
        // show error message
        echo "Error: " . mysqli_error($conn);
    }
    
    // close database connection
    mysqli_close($conn);
}
