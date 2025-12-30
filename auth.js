// Authentication Module with Local Storage

const Auth = {
    // Get all users from local storage
    getAllUsers() {
        const users = localStorage.getItem('wanderlust_users');
        return users ? JSON.parse(users) : [];
    },

    // Save users to local storage
    saveUsers(users) {
        localStorage.setItem('wanderlust_users', JSON.stringify(users));
    },

    // Get current logged in user
    getCurrentUser() {
        const user = localStorage.getItem('wanderlust_currentUser');
        return user ? JSON.parse(user) : null;
    },

    // Set current logged in user
    setCurrentUser(user) {
        localStorage.setItem('wanderlust_currentUser', JSON.stringify(user));
    },

    // Clear current user (logout)
    clearCurrentUser() {
        localStorage.removeItem('wanderlust_currentUser');
    },

    // Register new user
    register(email, password, fullName) {
        const users = this.getAllUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Validate password
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email,
            password, // In production, this should be hashed
            fullName,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);
        
        return { success: true, message: 'Registration successful' };
    },

    // Login user
    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Store current user (without password)
        const { password: _, ...userWithoutPassword } = user;
        this.setCurrentUser(userWithoutPassword);
        
        return { success: true, message: 'Login successful', user: userWithoutPassword };
    },

    // Logout user
    logout() {
        this.clearCurrentUser();
    },

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
};

// Redirect to login if not authenticated
function requireAuth() {
    if (!Auth.isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Update navbar based on authentication status
function updateNavbar() {
    const user = Auth.getCurrentUser();
    const authLink = document.getElementById('authLink');
    const navLinks = document.querySelector('.nav-links');
    
    if (!authLink && !navLinks) return;

    if (user) {
        // Add My Bookings and logout
        if (authLink) {
            authLink.innerHTML = `
                <a href="dashboard.html" style="color: var(--dark); margin-right: 1rem; text-decoration: none;"><i class="fas fa-chart-line"></i> Dashboard</a>
                <a href="my-bookings.html"><i class="fas fa-ticket-alt"></i> My Bookings</a>
            `;
        }
        
        if (navLinks) {
            const logoutBtn = document.createElement('li');
            logoutBtn.innerHTML = `
                <a href="#" class="btn-primary" onclick="handleLogout(event)">
                    Logout (${user.fullName})
                </a>
            `;
            navLinks.appendChild(logoutBtn);
        }
    } else {
        // Add login/signup buttons
        if (authLink) {
            authLink.innerHTML = `
                <a href="login.html" class="btn-primary">Login / Sign Up</a>
            `;
        }
    }
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    Auth.logout();
    alert('Logged out successfully');
    window.location.href = 'login.html';
}

// Call updateNavbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar);
