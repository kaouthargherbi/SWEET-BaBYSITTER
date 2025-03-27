<?php
session_start();
include 'db_connect.php'; // الاتصال بقاعدة البيانات

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] != "babysitter") {
    header("Location: login.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bio = $_POST["bio"];
    $user_id = $_SESSION["user_id"];

    // تحديث الصورة الشخصية إذا تم تحميل صورة جديدة
    if (!empty($_FILES["profile_picture"]["name"])) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["profile_picture"]["name"]);
        move_uploaded_file($_FILES["profile_picture"]["tmp_name"], $target_file);
        $query = "UPDATE users SET bio='$bio', profile_picture='$target_file' WHERE id='$user_id'";
    } else {
        $query = "UPDATE users SET bio='$bio' WHERE id='$user_id'";
    }

    if (mysqli_query($conn, $query)) {
        header("Location: profile.php"); // توجيه الجليسة إلى صفحتها الشخصية بعد التحديث
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

?>

<form action="edit_profile.php" method="post" enctype="multipart/form-data">
    <label for="bio">Your Bio:</label>
    <textarea name="bio" id="bio"></textarea>

    <label for="profile_picture">Upload Profile Picture:</label>
    <input type="file" name="profile_picture" id="profile_picture">

    <input type="submit" value="Save">
</form>
