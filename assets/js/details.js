// Trip Detail Page Logic

function displayTripDetails() {
    const tripId = localStorage.getItem('selectedTripId');
    const trip = getTripById(tripId);
    
    if (!trip) {
        window.location.href = '../trips/index.html';
        return;
    }
    
    const detailsContainer = document.getElementById('trip-details');
    
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <div class="trip-detail-header">
                <h1>${trip.name}</h1>
                <div class="trip-detail-image"></div>
            </div>
            <div class="trip-detail-info">
                <div class="info-item">
                    <strong>Destination</strong>
                    <p>${trip.destination}</p>
                </div>
                <div class="info-item">
                    <strong>Duration</strong>
                    <p>${trip.duration}</p>
                </div>
                <div class="info-item">
                    <strong>Price</strong>
                    <p>${formatCurrency(trip.price)}</p>
                </div>
                <div class="info-item">
                    <strong>Departure</strong>
                    <p>${formatDate(trip.departure)}</p>
                </div>
                <div class="info-item">
                    <strong>Rating</strong>
                    <p>${generateStars(trip.rating)} (${trip.reviews} reviews)</p>
                </div>
                <div class="info-item">
                    <strong>Accommodation</strong>
                    <p>${trip.accommodation}</p>
                </div>
            </div>
            <div class="trip-description">
                <h2>About This Trip</h2>
                <p>${trip.description}</p>
                <h3>Activities Included</h3>
                <ul>
                    ${trip.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Book button handler
    const bookBtn = document.getElementById('bookBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            if (!isAuthenticated()) {
                showNotification('Please login to book a trip', 'error');
                setTimeout(() => {
                    window.location.href = '../auth/login.html';
                }, 1500);
                return;
            }
            
            localStorage.setItem('selectedTripId', tripId);
            window.location.href = '../checkout/index.html';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayTripDetails);
