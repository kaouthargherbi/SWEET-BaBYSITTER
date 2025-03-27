<?php
include 'db_connect.php'; // الاتصال بقاعدة البيانات
session_start();

$babysitter_id = $_GET['id'];

$query = "SELECT name, bio, profile_picture FROM users WHERE id='$babysitter_id'";
$result = mysqli_query($conn, $query);
$babysitter = mysqli_fetch_assoc($result);
?>

<h2><?php echo $babysitter['name']; ?>'s Profile</h2>
<img src="<?php echo $babysitter['profile_picture']; ?>" alt="Profile Picture">
<p><?php echo $babysitter['bio']; ?></p>

<!-- نظام التقييم -->
<form action="rate_babysitter.php" method="post">
  <input type="hidden" name="babysitter_id" value="<?php echo $babysitter_id; ?>">
  <label for="rating">Rate this babysitter:</label>
  <select name="rating" id="rating">
    <option value="1">1 Star</option>
    <option value="2">2 Stars</option>
    <option value="3">3 Stars</option>
    <option value="4">4 Stars</option>
    <option value="5">5 Stars</option>
  </select>
  <input type="submit" value="Submit Rating">
</form>

<!-- زر الحجز -->
<form action="book_babysitter.php" method="post">
  <input type="hidden" name="babysitter_id" value="<?php echo $babysitter_id; ?>">
  <input type="submit" value="Book Now">
</form>
