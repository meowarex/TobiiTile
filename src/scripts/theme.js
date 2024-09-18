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

// Function to toggle theme
function toggleTheme(isDark) {
    if (isDark) {
        document.body.classList.add('bg-gray-900', 'text-white');
        // Set Moon icon for Dark Mode
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        `;
    } else {
        document.body.classList.remove('bg-gray-900', 'text-white');
        // Set Sun icon for Light Mode
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m0 14v1m8-8h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        `;
    }

    // Update input styles based on the new theme
    updateInputStyles(isDark);

    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update aria-pressed attribute for accessibility
    themeToggleButton.setAttribute('aria-pressed', isDark);
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const logoutButton = document.getElementById('logout-button');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme(true);
    } else {
        toggleTheme(false);
    }

    // Theme Toggle Event Listener
    themeToggleButton.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('bg-gray-900');
        toggleTheme(isDark);
    });

    // Logout Button Event Listener
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

    // Zoom Controls Elements
    const zoomIncreaseBtn = document.getElementById('zoom-increase');
    const zoomDecreaseBtn = document.getElementById('zoom-decrease');
    const zoomValueSpan = document.getElementById('zoom-value');

    // Function to update the zoom value display based on current zoom level
    function updateZoomDisplay() {
        const currentZoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10) || 0;
        const zoomPercentage = 100 + currentZoomLevel * 20;
        zoomValueSpan.textContent = `${zoomPercentage}%`;
    }

    // Event listener for Zoom Increase
    zoomIncreaseBtn.addEventListener('click', () => {
        window.api.send('zoom-in');
        let currentZoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10) || 0;
        if (currentZoomLevel < 10) { // Prevent excessive zoom in
            currentZoomLevel += 1;
            localStorage.setItem('zoomLevel', currentZoomLevel);
            updateZoomDisplay();
        }
    });

    // Event listener for Zoom Decrease
    zoomDecreaseBtn.addEventListener('click', () => {
        window.api.send('zoom-out');
        let currentZoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10) || 0;
        if (currentZoomLevel > -10) { // Prevent excessive zoom out
            currentZoomLevel -= 1;
            localStorage.setItem('zoomLevel', currentZoomLevel);
            updateZoomDisplay();
        }
    });

    // Initialize Zoom Display
    updateZoomDisplay();
});