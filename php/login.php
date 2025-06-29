<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobile = $_POST["mobile"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT password FROM User WHERE mobile = ?");
    $stmt->bind_param("s", $mobile);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            session_start();
            $_SESSION["user"] = $mobile;
            echo "success";
        } else {
            echo "invalid";
        }
    } else {
        echo "notfound";
    }

    $stmt->close();
    $conn->close();
}
?>
