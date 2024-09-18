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

    // Initial update based on default theme
    const isDarkMode = document.body.classList.contains('bg-gray-900');
    updateInputStyles(isDarkMode);
});