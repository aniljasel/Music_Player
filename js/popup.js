document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.querySelector("#settings-button");
    const settingsOverlay = document.querySelector("#settings-overlay");
    const closePopup = document.querySelector("#close-popup");
    const themeToggle = document.querySelector("#toggle-theme");

    // Show settings popup
    settingsButton.addEventListener("click", () => {
        settingsOverlay.style.display = "flex";
    });

    // Close popup when clicking close button
    closePopup.addEventListener("click", () => {
        settingsOverlay.style.display = "none";
    });

    // Close popup when clicking outside the popup content
    settingsOverlay.addEventListener("click", (event) => {
        if (event.target === settingsOverlay) {
            settingsOverlay.style.display = "none";
        }
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "Light Mode" : "Dark Mode";
    });
});
