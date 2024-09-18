// Function to initialize the Dashboard (Home) component
function initializeDashboard() {
    const app = document.getElementById('app');

    // Create Dashboard Section
    const dashboardSection = document.createElement('div');
    dashboardSection.id = 'dashboard-section';
    dashboardSection.className = 'hidden p-6 text-current';

    const dashboardTitle = document.createElement('h2');
    dashboardTitle.textContent = 'Home';
    dashboardTitle.className = 'text-2xl mb-4 text-center';

    const buttonGrid = document.createElement('div');
    buttonGrid.className = 'grid grid-cols-2 gap-4';

    // Example Buttons
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.textContent = `Button ${i}`;
        button.className = 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300';
        button.onclick = () => alert(`Button ${i} Clicked`);
        buttonGrid.appendChild(button);
    }

    // Logout Button
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.className = 'mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300';
    logoutButton.onclick = () => {
        dashboardSection.classList.add('hidden');
        const loginSection = document.getElementById('login-section');
        loginSection.classList.remove('hidden');
    };

    dashboardSection.appendChild(dashboardTitle);
    dashboardSection.appendChild(buttonGrid);
    dashboardSection.appendChild(logoutButton);

    app.appendChild(dashboardSection);
}

// Expose the initializeDashboard function to the global scope
window.initializeDashboard = initializeDashboard;