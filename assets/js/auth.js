// Used in Login and Signup pages

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('wanderlust_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already exists." };
    }

    const newUser = { id: Date.now(), name, email, password, bookings: [] };
    users.push(newUser);
    localStorage.setItem('wanderlust_users', JSON.stringify(users));
    return { success: true };
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('wanderlust_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Create session
        localStorage.setItem('wanderlust_currentUser', JSON.stringify(user));
        return { success: true };
    }
    return { success: false, message: "Invalid credentials." };
}

function requireAuth() {
    if (!getCurrentUser()) {
        window.location.href = '../auth/login.html';
    }
}