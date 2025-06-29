document.addEventListener("DOMContentLoaded", function () {
    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const openRegister = document.getElementById("openRegister");
    const closeRegister = document.getElementById("closeRegister");
    const openLogin = document.getElementById("openLogin");
    const closeLogin = document.getElementById("closeLogin");
    const openRegisterFromLogin = document.getElementById("openRegisterFromLogin");

    // Ensure modals are hidden on page load without affecting their functionality
    registerModal.style.display = "none";
    loginModal.style.display = "none";
    registerModal.style.visibility = "visible";
    loginModal.style.visibility = "visible";

    // Function to show modal
    function showModal(modal) {
        modal.style.display = "flex";
    }

    // Function to hide modal
    function hideModal(modal) {
        modal.style.display = "none";
    }

    // Open Registration Modal
    openRegister.addEventListener("click", function () {
        showModal(registerModal);
    });

    // Close Registration Modal
    closeRegister.addEventListener("click", function () {
        hideModal(registerModal);
    });

    // Open Login Modal from Register Modal
    openLogin.addEventListener("click", function () {
        hideModal(registerModal);
        showModal(loginModal);
    });

    // Close Login Modal
    closeLogin.addEventListener("click", function () {
        hideModal(loginModal);
    });

    // Open Register Modal from Login Modal
    openRegisterFromLogin.addEventListener("click", function () {
        hideModal(loginModal);
        showModal(registerModal);
    });

    // Close modals when clicking outside content
    window.addEventListener("click", function (event) {
        if (event.target === registerModal) {
            hideModal(registerModal);
        }
        if (event.target === loginModal) {
            hideModal(loginModal);
        }
    });
});

document.getElementById("registerBtn").addEventListener("click", function () {
    let mobile = document.getElementById("regMobile").value;
    let password = document.getElementById("regPassword").value;

    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `mobile=${mobile}&password=${password}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            alert("Registration successful!");
            document.getElementById("registerModal").style.display = "none";
        } else if (data === "exists") {
            alert("Mobile number already registered!");
        } else {
            alert("Registration failed!");
        }
    });
});

document.getElementById("loginBtn").addEventListener("click", function () {
    let mobile = document.getElementById("loginMobile").value;
    let password = document.getElementById("loginPassword").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `mobile=${mobile}&password=${password}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect after login
        } else if (data === "invalid") {
            alert("Incorrect password!");
        } else {
            alert("User not found!");
        }
    });
});


