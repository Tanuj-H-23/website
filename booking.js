// Booking Management Module

const Booking = {
    // Get all bookings for current user
    getBookings() {
        const user = Auth.getCurrentUser();
        if (!user) return [];
        
        const allBookings = JSON.parse(localStorage.getItem('wanderlust_bookings') || '{}');
        return allBookings[user.id] || [];
    },

    // Save booking
    saveBooking(bookingData) {
        const user = Auth.getCurrentUser();
        if (!user) return { success: false, message: 'User not logged in' };

        const allBookings = JSON.parse(localStorage.getItem('wanderlust_bookings') || '{}');
        
        if (!allBookings[user.id]) {
            allBookings[user.id] = [];
        }

        const booking = {
            id: Date.now(),
            ...bookingData,
            userId: user.id,
            bookingDate: new Date().toISOString(),
            status: 'Confirmed'
        };

        allBookings[user.id].push(booking);
        localStorage.setItem('wanderlust_bookings', JSON.stringify(allBookings));

        return { success: true, booking };
    },

    // Get booking by ID
    getBooking(bookingId) {
        const bookings = this.getBookings();
        return bookings.find(b => b.id == bookingId);
    },

    // Store current booking session
    setCurrentBookingSession(data) {
        sessionStorage.setItem('wanderlust_booking_session', JSON.stringify(data));
    },

    // Get current booking session
    getCurrentBookingSession() {
        const session = sessionStorage.getItem('wanderlust_booking_session');
        return session ? JSON.parse(session) : null;
    },

    // Clear booking session
    clearBookingSession() {
        sessionStorage.removeItem('wanderlust_booking_session');
    }
};
