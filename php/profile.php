<?php
// connect to MongoDB database
$mongo = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$dbname = "mydatabase";
$collection = "user_profiles";

// get form data
$age = $_POST['age'];
$dob = $_POST['dob'];
$contact = $_POST['contact'];

// get user information from local storage
session_start();
$user_id = $_SESSION['user_id'];

// update user profile in MongoDB
$filter = ['user_id' => $user_id];
$options = ['$set' => ['age' => $age, 'dob' => $dob, 'contact' => $contact]];
$update_result = $mongo->executeUpdate("$dbname.$collection", new MongoDB\Driver\BulkWrite([$filter => $options]));

// check if update was successful
if ($update_result->getModifiedCount() == 1) {
    echo "Profile updated successfully";
} else {
    echo "Error updating profile";
}
?>
