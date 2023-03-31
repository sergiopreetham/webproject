<?php
// connect to MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// get form data
$username_email = mysqli_real_escape_string($conn, $_POST['username_email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

// validate form data
if (empty($username_email) || empty($password)) {
    echo "Please enter username/email and password";
} else {
	// check if username/email and password combination exist in database
	$sql = "SELECT * FROM users WHERE (username = '$username_email' OR email = '$username_email') LIMIT 1";
	$result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) == 1) {
		$user = mysqli_fetch_assoc($result);
		if (password_verify($password, $user['password'])) {
			// login successful
			echo "success";
		} else {
			// password is incorrect
			echo "Incorrect password";
		}
	} else {
		// username/email not found
		echo "Username/Email not found";
	}

	// close database connection
	mysqli_close($conn);
}
?>
