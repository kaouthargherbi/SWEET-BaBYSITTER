<?php
session_start();
include 'db_connect.php'; // تأكد من أنك تتصل بقاعدة البيانات

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $role = $_POST["role"]; // دور المستخدم (Parent أو Babysitter)

    $query = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$password', '$role')";
    if (mysqli_query($conn, $query)) {
        $_SESSION["user_id"] = mysqli_insert_id($conn);
        $_SESSION["role"] = $role;

        // توجيه الجليسات إلى تعديل الملف الشخصي
        if ($role == "babysitter") {
            header("Location: edit_profile.php");
        } else {
            header("Location: index.php"); // توجيه الآباء إلى الصفحة الرئيسية
        }
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
