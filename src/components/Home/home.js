// Function to initialize the Dashboard (Home) component
function initializeDashboard() {
    const app = document.getElementById('app');

    // Create Dashboard Section
    const dashboardSection = document.createElement('div');
    dashboardSection.id = 'dashboard-section';
    dashboardSection.className = 'hidden p-6 text-current';

    const dashboardTitle = document.createElement('h2');
    dashboardTitle.textContent = 'Home';
    dashboardTitle.className = 'text-2xl mb-6 text-center';

    // Pinned Actions Section with 4 Large Square Buttons
    const pinnedActions = document.createElement('div');
    pinnedActions.className = 'flex flex-wrap justify-center gap-4 mb-8';

    // Adjust button classes for responsiveness and alignment
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.textContent = `Pinned Action ${i}`;
        button.className = 'bg-blue-500 text-white flex-grow min-w-[120px] h-32 sm:h-40 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300';
        button.onclick = () => alert(`Pinned Action ${i} Clicked`);
        pinnedActions.appendChild(button);
    }

    // Favorites Section with Title and 4 Large Square Buttons
    const favoritesTitle = document.createElement('h3');
    favoritesTitle.textContent = 'Favorites';
    favoritesTitle.className = 'text-xl mb-4 text-center';

    const favoritesActions = document.createElement('div');
    favoritesActions.className = 'flex flex-wrap justify-center gap-4 mb-8';

    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.textContent = `Favorite ${i}`;
        button.className = 'bg-purple-500 text-white flex-grow min-w-[120px] h-32 sm:h-40 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300';
        button.onclick = () => alert(`Favorite ${i} Clicked`);
        favoritesActions.appendChild(button);
    }

    // Append sections to Dashboard
    dashboardSection.appendChild(dashboardTitle);
    dashboardSection.appendChild(pinnedActions);

    // Append Favorites Section
    dashboardSection.appendChild(favoritesTitle);
    dashboardSection.appendChild(favoritesActions);

    app.appendChild(dashboardSection);
}

// Expose the initializeDashboard function to the global scope
window.initializeDashboard = initializeDashboard;