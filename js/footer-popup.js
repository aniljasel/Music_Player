document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.querySelector("#footer-set-btn");
    const settingsOverlay = document.querySelector("#settings-overlay");
    const closePopup = document.querySelector("#close-popup");

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
});
