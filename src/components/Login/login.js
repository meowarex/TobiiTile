document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Create Login Section
    const loginSection = document.createElement('div');
    loginSection.id = 'login-section';
    loginSection.className = 'max-w-md mx-auto mt-10 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded shadow text-current';

    const loginTitle = document.createElement('h2');
    loginTitle.textContent = 'Tobii Tile';
    loginTitle.className = 'text-2xl mb-4 text-center';

    const form = document.createElement('form');

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username';
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.className = 'block mb-2';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.required = true;
    usernameInput.className = 'w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300';
    usernameInput.setAttribute('aria-required', 'true');

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.className = 'block mb-2';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.required = true;
    passwordInput.className = 'w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300';
    passwordInput.setAttribute('aria-required', 'true');

    const loginButton = document.createElement('button');
    loginButton.type = 'submit';
    loginButton.textContent = 'Login';
    loginButton.className = 'w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300';

    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);

    loginSection.appendChild(loginTitle);
    loginSection.appendChild(form);

    // Add Login Section to App
    app.appendChild(loginSection);

    // Handle Login
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple validation (replace with real authentication)
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            loginSection.classList.add('hidden');
            // Initialize Dashboard from Home component
            if (typeof initializeDashboard === 'function') {
                initializeDashboard();
                const dashboardSection = document.getElementById('dashboard-section');
                if (dashboardSection) {
                    dashboardSection.classList.remove('hidden');
                }
            } else {
                console.error('initializeDashboard function is not available.');
            }
        } else {
            alert('Please enter both username and password.');
        }
    });
});