<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobile = $_POST["mobile"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT); // Hash password

    // Check if mobile already exists
    $checkUser = $conn->prepare("SELECT id FROM User WHERE mobile = ?");
    $checkUser->bind_param("s", $mobile);
    $checkUser->execute();
    $checkUser->store_result();
    
    if ($checkUser->num_rows > 0) {
        echo "exists";
    } else {
        $stmt = $conn->prepare("INSERT INTO User (mobile, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $mobile, $password);

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "error";
        }

        $stmt->close();
    }
    
    $checkUser->close();
    $conn->close();
}
?>
