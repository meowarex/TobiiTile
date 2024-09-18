document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Theme Toggle Functionality
    const themeToggleButton = document.getElementById('theme-toggle');

    themeToggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('bg-white');
        document.body.classList.toggle('text-white');
        document.body.classList.toggle('text-gray-900');
        
        // Toggle button colors
        themeToggleButton.classList.toggle('bg-gray-700');
        themeToggleButton.classList.toggle('bg-gray-300');
        themeToggleButton.classList.toggle('text-white');
        themeToggleButton.classList.toggle('text-gray-900');
        
        // Update input styles based on the new theme
        updateInputStyles(isDark);
    });

    // Logout Button Functionality
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', () => {
        const dashboardSection = document.getElementById('dashboard-section');
        const loginSection = document.getElementById('login-section');

        if (dashboardSection && loginSection) {
            dashboardSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        } else {
            console.error('Dashboard or Login section not found.');
        }
    });

    // Initial update based on default theme
    const isDarkMode = document.body.classList.contains('bg-gray-900');
    updateInputStyles(isDarkMode);

    // Zoom Controls Functionality
    const zoomIncreaseButton = document.getElementById('zoom-increase');
    const zoomDecreaseButton = document.getElementById('zoom-decrease');
    const zoomValueSpan = document.getElementById('zoom-value');
    let currentZoomLevel = 0; // Default zoom level corresponding to 100%

    // Function to update the zoom value display
    function updateZoomValue() {
        const zoomPercentage = 100 + (currentZoomLevel * 20); // Each level is ~20%
        zoomValueSpan.textContent = `${zoomPercentage}%`;
    }

    // Initialize zoom level from Electron's webFrame
    if (window.api && typeof window.api.getZoomLevel === 'function') {
        currentZoomLevel = window.api.getZoomLevel();
        updateZoomValue();
    }

    // Event listener for Zoom Increase
    zoomIncreaseButton.addEventListener('click', () => {
        if (window.api && typeof window.api.setZoomLevel === 'function') {
            if (currentZoomLevel < 10) { // Prevent excessive zoom in
                currentZoomLevel += 1;
                window.api.setZoomLevel(currentZoomLevel);
                updateZoomValue();
                localStorage.setItem('zoomLevel', currentZoomLevel);
            }
        }
    });

    // Event listener for Zoom Decrease
    zoomDecreaseButton.addEventListener('click', () => {
        if (window.api && typeof window.api.setZoomLevel === 'function') {
            if (currentZoomLevel > -10) { // Prevent excessive zoom out
                currentZoomLevel -= 1;
                window.api.setZoomLevel(currentZoomLevel);
                updateZoomValue();
                localStorage.setItem('zoomLevel', currentZoomLevel);
            }
        }
    });

    // Restore Zoom Level on Load
    document.addEventListener('DOMContentLoaded', () => {
        const savedZoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10);
        if (!isNaN(savedZoomLevel)) {
            currentZoomLevel = savedZoomLevel;
            window.api.setZoomLevel(currentZoomLevel);
            updateZoomValue();
        }
    });
});

// Function to update input styles based on theme
function updateInputStyles(isDark) {
    const inputs = document.querySelectorAll('#login-section input');
    inputs.forEach(input => {
        if (isDark) {
            input.classList.remove('bg-white', 'text-gray-900', 'border-gray-300');
            input.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
        } else {
            input.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            input.classList.add('bg-white', 'text-gray-900', 'border-gray-300');
        }
    });
}

// Remove or comment out any zoom-related functions
// Example:
/*
function decreaseZoom() {
    // Logic to decrease zoom
}

function increaseZoom() {
    // Logic to increase zoom
}
*/