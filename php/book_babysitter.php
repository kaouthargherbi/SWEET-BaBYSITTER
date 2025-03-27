<?php
include 'db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $babysitter_id = $_POST["babysitter_id"];
    $parent_id = $_SESSION["user_id"];

    $query = "INSERT INTO bookings (parent_id, babysitter_id) VALUES ('$parent_id', '$babysitter_id')";
    if (mysqli_query($conn, $query)) {
        echo "Booking successful!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
