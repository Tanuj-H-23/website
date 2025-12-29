// Check if user is logged in
function getCurrentUser() {
    const user = localStorage.getItem('wanderlust_currentUser');
    return user ? JSON.parse(user) : null;
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Inject Navigation Bar (Dynamic based on Auth state)
function renderNavbar() {
    const user = getCurrentUser();
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    
    // Determine path depth to link correctly from subfolders
    const path = window.location.pathname;
    const isRoot = path.endsWith('index.html') || path.endsWith('/');
    const prefix = path.includes('/auth/') || path.includes('/trips/') || path.includes('/checkout/') ? '../' : './';
    
    // Fix specific root edge case
    const homeLink = path.includes('wanderlust-agent') && !path.includes('index.html') && !path.includes('/') ? './' : prefix;

    nav.innerHTML = `
        <a href="${prefix}index.html" class="logo">Wander<span>lust</span>.</a>
        <div class="nav-links">
            <a href="${prefix}trips/index.html">Destinations</a>
            ${user ? `<a href="${prefix}dashboard.html">Dashboard</a>` : ''}
            ${user 
                ? `<button id="logoutBtn" class="btn btn-outline">Logout (${user.name})</button>` 
                : `<a href="${prefix}auth/login.html" class="btn btn-primary">Login</a>`
            }
        </div>
    `;

    document.body.prepend(nav);

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('wanderlust_currentUser');
            window.location.href = `${prefix}index.html`;
        });
    }
}

// Auto-run on load
document.addEventListener('DOMContentLoaded', renderNavbar);