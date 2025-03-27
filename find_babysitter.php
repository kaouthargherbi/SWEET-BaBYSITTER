<?php
include 'db_connect.php'; // الاتصال بقاعدة البيانات

$query = "SELECT id, name, profile_picture FROM users WHERE role='babysitter'";
$result = mysqli_query($conn, $query);

echo "<h2>Find a Babysitter</h2>";
while ($row = mysqli_fetch_assoc($result)) {
    echo "<div class='babysitter'>";
    echo "<img src='" . $row['profile_picture'] . "' alt='Profile Picture'>";
    echo "<p>" . $row['name'] . "</p>";
    echo "<a href='view_profile.php?id=" . $row['id'] . "'>View Profile</a>";
    echo "</div>";
}
?>
