// Payment & Booking Logic

function displayCheckoutSummary() {
    const tripId = localStorage.getItem('selectedTripId');
    const trip = getTripById(tripId);
    
    if (!trip) {
        window.location.href = '../trips/index.html';
        return;
    }
    
    const summaryContainer = document.getElementById('summary');
    
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <div class="summary-label">Trip Name</div>
                <div class="summary-value">${trip.name}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Destination</div>
                <div class="summary-value">${trip.destination}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Duration</div>
                <div class="summary-value">${trip.duration}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Departure Date</div>
                <div class="summary-value">${formatDate(trip.departure)}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Price per Person</div>
                <div class="summary-value">${formatCurrency(trip.price)}</div>
            </div>
            <div class="summary-total">
                Total: ${formatCurrency(trip.price)}
            </div>
        `;
    }
}

// Handle passenger form submission
function handlePassengerForm() {
    const passengerForm = document.getElementById('passengerForm');
    
    if (passengerForm) {
        passengerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input');
            const passengerInfo = {
                name: inputs[0].value,
                email: inputs[1].value,
                phone: inputs[2].value
            };
            
            // Validate
            if (!passengerInfo.name || !passengerInfo.email || !passengerInfo.phone) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(passengerInfo.email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            // Store booking info
            storeBookingInfo(localStorage.getItem('selectedTripId'), passengerInfo);
            
            showNotification('Proceeding to payment...', 'success');
            setTimeout(() => {
                window.location.href = './payment.html';
            }, 1500);
        });
        
        const proceedBtn = document.getElementById('proceedPayment');
        if (proceedBtn) {
            proceedBtn.click();
        }
    }
}

// Handle payment form submission
function handlePaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input');
            const cardInfo = {
                holder: inputs[0].value,
                number: inputs[1].value,
                expiry: inputs[2].value,
                cvv: inputs[3].value
            };
            
            // Basic validation
            if (!cardInfo.holder || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
                showNotification('Please fill all card details', 'error');
                return;
            }
            
            // Validate card number
            if (cardInfo.number.length !== 16) {
                showNotification('Card number must be 16 digits', 'error');
                return;
            }
            
            showNotification('Processing payment...', 'success');
            setTimeout(() => {
                // Clear booking info and redirect
                clearBookingInfo();
                localStorage.removeItem('selectedTripId');
                window.location.href = './success.html';
            }, 2000);
        });
    }
}

// Display success confirmation
function displaySuccessConfirmation() {
    const booking = getBookingInfo();
    const tripId = localStorage.getItem('selectedTripId');
    const trip = tripId ? getTripById(tripId) : null;
    
    const confirmationContainer = document.getElementById('confirmation-details');
    
    if (confirmationContainer) {
        let tripName = 'Unknown Trip';
        if (trip) {
            tripName = trip.name;
        }
        
        confirmationContainer.innerHTML = `
            <div class="confirmation-item">
                <strong>Confirmation Number:</strong> #${Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
            <div class="confirmation-item">
                <strong>Trip:</strong> ${tripName}
            </div>
            ${booking ? `
                <div class="confirmation-item">
                    <strong>Passenger Name:</strong> ${booking.passengerInfo.name}
                </div>
                <div class="confirmation-item">
                    <strong>Email:</strong> ${booking.passengerInfo.email}
                </div>
                <div class="confirmation-item">
                    <strong>Phone:</strong> ${booking.passengerInfo.phone}
                </div>
            ` : ''}
        `;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('checkout/index.html')) {
        authGuard();
        displayCheckoutSummary();
        handlePassengerForm();
    } else if (currentPage.includes('checkout/payment.html')) {
        authGuard();
        handlePaymentForm();
    } else if (currentPage.includes('checkout/success.html')) {
        authGuard();
        displaySuccessConfirmation();
    }
});
