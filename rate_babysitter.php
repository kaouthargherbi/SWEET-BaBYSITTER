<?php
include 'db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $babysitter_id = $_POST["babysitter_id"];
    $rating = $_POST["rating"];

    $query = "INSERT INTO ratings (babysitter_id, rating) VALUES ('$babysitter_id', '$rating')";
    if (mysqli_query($conn, $query)) {
        header("Location: view_profile.php?id=" . $babysitter_id);
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
