document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Theme Toggle Functionality
    const themeToggleButton = document.getElementById('theme-toggle');

    // Select the Top Bar element
    const topBar = document.getElementById('top-bar');

    // Select the Main Container element
    const mainContainer = document.getElementById('main-container');

    // Select the App element
    const appContainer = document.getElementById('app');

    themeToggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('bg-white');
        document.body.classList.toggle('text-white');
        document.body.classList.toggle('text-gray-900');
        
        // Update Top Bar background based on the current theme
        if (isDark) {
            topBar.classList.remove('bg-gray-100'); // Remove light mode bg
            topBar.classList.add('bg-gray-900');    // Add dark mode bg

            // Update Main Container background
            mainContainer.classList.remove('bg-white'); // Remove light mode bg
            mainContainer.classList.add('bg-gray-900');  // Add dark mode bg

            // Update App Container background
            appContainer.classList.remove('bg-white'); // Remove light mode bg
            appContainer.classList.add('bg-gray-900');  // Add dark mode bg
        } else {
            topBar.classList.remove('bg-gray-900'); // Remove dark mode bg
            topBar.classList.add('bg-gray-100');    // Add light mode bg (almost white)

            // Update Main Container background
            mainContainer.classList.remove('bg-gray-900'); // Remove dark mode bg
            mainContainer.classList.add('bg-white');        // Add light mode bg (white)

            // Update App Container background
            appContainer.classList.remove('bg-gray-900'); // Remove dark mode bg
            appContainer.classList.add('bg-white');        // Add light mode bg (white)
        }

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

    // Initialize zoom level from Electron's API
    if (window.api && typeof window.api.getZoomLevel === 'function') {
        window.api.getZoomLevel().then(level => {
            console.log(`Initialized zoom level: ${level}`); // Debug log
            currentZoomLevel = level;
            updateZoomValue();
        }).catch(err => {
            console.error('Error getting zoom level:', err);
        });
    } else {
        console.error('getZoomLevel function is not available'); // Debug log
    }

    // Updated Event Listener for Zoom Increase
    zoomIncreaseButton.addEventListener('click', async () => {
        console.log('Zoom Increase button clicked'); // Debug log
        if (window.api && typeof window.api.setZoomLevel === 'function') {
            if (currentZoomLevel < 10) { // Prevent excessive zoom in
                currentZoomLevel += 1;
                console.log(`Setting zoom level to: ${currentZoomLevel}`); // Debug log
                try {
                    const success = await window.api.setZoomLevel(currentZoomLevel);
                    if (success) {
                        updateZoomValue();
                        localStorage.setItem('zoomLevel', currentZoomLevel);
                        console.log(`Zoom level successfully set to: ${currentZoomLevel}`); // Debug log
                    } else {
                        console.error('Failed to set zoom level.');
                    }
                } catch (error) {
                    console.error('Error setting zoom level:', error);
                }
            } else {
                console.error('Maximum zoom level reached'); // Debug log
            }
        } else {
            console.error('setZoomLevel function is not available'); // Debug log
        }
    });

    // Updated Event Listener for Zoom Decrease
    zoomDecreaseButton.addEventListener('click', async () => {
        console.log('Zoom Decrease button clicked'); // Debug log
        if (window.api && typeof window.api.setZoomLevel === 'function') {
            if (currentZoomLevel > -10) { // Prevent excessive zoom out
                currentZoomLevel -= 1;
                console.log(`Setting zoom level to: ${currentZoomLevel}`); // Debug log
                try {
                    const success = await window.api.setZoomLevel(currentZoomLevel);
                    if (success) {
                        updateZoomValue();
                        localStorage.setItem('zoomLevel', currentZoomLevel);
                        console.log(`Zoom level successfully set to: ${currentZoomLevel}`); // Debug log
                    } else {
                        console.error('Failed to set zoom level.');
                    }
                } catch (error) {
                    console.error('Error setting zoom level:', error);
                }
            } else {
                console.error('Minimum zoom level reached'); // Debug log
            }
        } else {
            console.error('setZoomLevel function is not available'); // Debug log
        }
    });

    // Restore Zoom Level on Load
    window.addEventListener('load', () => {
        const savedZoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10);
        if (!isNaN(savedZoomLevel)) {
            currentZoomLevel = savedZoomLevel;
            window.api.setZoomLevel(currentZoomLevel).then(success => {
                if (success) {
                    updateZoomValue();
                    console.log(`Restored zoom level to: ${currentZoomLevel}`); // Debug log
                } else {
                    console.error('Failed to restore zoom level.');
                }
            }).catch(err => {
                console.error('Error restoring zoom level:', err);
            });
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