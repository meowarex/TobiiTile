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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const logoutButton = document.getElementById('logout-button');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('bg-gray-900', 'text-white');
            themeToggleButton.classList.add('bg-gray-900', 'text-white');
            // Set Moon icon for Dark Mode
            themeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            `;
        } else {
            document.body.classList.remove('bg-gray-900', 'text-white');
            themeToggleButton.classList.remove('bg-gray-900', 'text-white');
            // Set Sun icon for Light Mode
            themeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M6 12H4m1.636 6.364l1.414-1.414M12 20v-2m-4.95-4.95l-1.414 1.414M6.343 6.343l1.414 1.414" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none" />
            `;
        }
        updateInputStyles(savedTheme === 'dark');
    } else {
        // Default to Light Mode
        themeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M6 12H4m1.636 6.364l1.414-1.414M12 20v-2m-4.95-4.95l-1.414 1.414M6.343 6.343l1.414 1.414" />
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none" />
        `;
    }

    // Theme Toggle Event Listener
    themeToggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('bg-white');
        document.body.classList.toggle('text-white');
        document.body.classList.toggle('text-gray-900');
        
        // Toggle Theme Toggle Button Colors
        themeToggleButton.classList.toggle('bg-gray-900');
        themeToggleButton.classList.toggle('bg-gray-300');
        themeToggleButton.classList.toggle('text-white');
        themeToggleButton.classList.toggle('text-gray-900');
        
        // Update input styles based on the new theme
        updateInputStyles(isDark);

        // Swap icons
        if (isDark) {
            // Set Moon icon for Dark Mode
            themeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            `;
        } else {
            // Set Sun icon for Light Mode
            themeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M6 12H4m1.636 6.364l1.414-1.414M12 20v-2m-4.95-4.95l-1.414 1.414M6.343 6.343l1.414 1.414" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none" />
            `;
        }

        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
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

    // Initial update based on default theme
    const isDarkMode = document.body.classList.contains('bg-gray-900');
    updateInputStyles(isDarkMode);

    // Zoom Controls
    const zoomDecreaseBtn = document.getElementById('zoom-decrease');
    const zoomIncreaseBtn = document.getElementById('zoom-increase');
    const zoomValueSpan = document.getElementById('zoom-value');
    const mainContainer = document.getElementById('main-container');

    let zoomLevel = parseInt(localStorage.getItem('zoomLevel'), 10) || 150; // Initial zoom level

    const updateZoom = () => {
        zoomValueSpan.textContent = `${zoomLevel}%`;
        mainContainer.style.transform = `scale(${zoomLevel / 100})`;
        mainContainer.style.transformOrigin = 'top left';
        localStorage.setItem('zoomLevel', zoomLevel);
    };

    zoomDecreaseBtn.addEventListener('click', () => {
        if (zoomLevel > 50) {
            zoomLevel -= 10;
            updateZoom();
        }
    });

    zoomIncreaseBtn.addEventListener('click', () => {
        if (zoomLevel < 200) {
            zoomLevel += 10;
            updateZoom();
        }
    });

    // Restore saved zoom level on load
    const savedZoom = localStorage.getItem('zoomLevel');
    if (savedZoom) {
        zoomLevel = parseInt(savedZoom, 10);
        zoomValueSpan.textContent = `${zoomLevel}%`;
        mainContainer.style.transform = `scale(${zoomLevel / 100})`;
        mainContainer.style.transformOrigin = 'top left';
    }

    updateZoom();
});