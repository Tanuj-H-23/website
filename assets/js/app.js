// Landing & Listing Page Logic

// Display trips on the page
function displayTrips(tripsToDisplay = getAllTrips()) {
    const tripsList = document.getElementById('trips-list');
    
    if (!tripsList) return;
    
    tripsList.innerHTML = '';
    
    if (tripsToDisplay.length === 0) {
        tripsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No trips found</p>';
        return;
    }
    
    tripsToDisplay.forEach(trip => {
        const tripCard = document.createElement('div');
        tripCard.className = 'trip-card';
        tripCard.innerHTML = `
            <div class="trip-card-image">${trip.destination}</div>
            <div class="trip-card-content">
                <h3>${trip.name}</h3>
                <div class="trip-card-info">${trip.destination} • ${trip.duration}</div>
                <div class="trip-rating">${generateStars(trip.rating)} (${trip.reviews} reviews)</div>
                <div class="trip-price">${formatCurrency(trip.price)}</div>
                <button class="trip-card-btn" onclick="viewTripDetails(${trip.id})">View Details</button>
            </div>
        `;
        tripsList.appendChild(tripCard);
    });
}

// View trip details
function viewTripDetails(tripId) {
    localStorage.setItem('selectedTripId', tripId);
    window.location.href = '../trips/details.html';
}

// Search trips
function searchTrips() {
    const searchBox = document.getElementById('searchBox');
    const filterPrice = document.getElementById('filterPrice');
    
    if (!searchBox || !filterPrice) return;
    
    const searchTerm = searchBox.value.toLowerCase();
    const priceFilter = filterPrice.value;
    
    const filtered = trips.filter(trip => {
        const matchesSearch = trip.name.toLowerCase().includes(searchTerm) ||
                            trip.destination.toLowerCase().includes(searchTerm) ||
                            trip.description.toLowerCase().includes(searchTerm);
        
        let matchesPrice = true;
        if (priceFilter === 'budget') {
            matchesPrice = trip.price <= 2000;
        } else if (priceFilter === 'standard') {
            matchesPrice = trip.price > 2000 && trip.price <= 3500;
        } else if (priceFilter === 'luxury') {
            matchesPrice = trip.price > 3500;
        }
        
        return matchesSearch && matchesPrice;
    });
    
    displayTrips(filtered);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Display all trips on listing page
    const tripsList = document.getElementById('trips-list');
    if (tripsList) {
        displayTrips();
        
        // Add search listeners
        const searchBox = document.getElementById('searchBox');
        const filterPrice = document.getElementById('filterPrice');
        
        if (searchBox) {
            searchBox.addEventListener('input', searchTrips);
        }
        if (filterPrice) {
            filterPrice.addEventListener('change', searchTrips);
        }
    }
    
    // Display featured trips on landing page
    const featuredTripsContainer = document.querySelector('.featured-trips');
    if (featuredTripsContainer && !tripsList) {
        const grid = document.querySelector('.trips-grid');
        if (grid) {
            const featuredTrips = getAllTrips().slice(0, 3);
            featuredTrips.forEach(trip => {
                const tripCard = document.createElement('div');
                tripCard.className = 'trip-card';
                tripCard.innerHTML = `
                    <div class="trip-card-image">${trip.destination}</div>
                    <div class="trip-card-content">
                        <h3>${trip.name}</h3>
                        <div class="trip-card-info">${trip.destination} • ${trip.duration}</div>
                        <div class="trip-rating">${generateStars(trip.rating)} (${trip.reviews} reviews)</div>
                        <div class="trip-price">${formatCurrency(trip.price)}</div>
                        <button onclick="viewTripDetails(${trip.id})">View Details</button>
                    </div>
                `;
                grid.appendChild(tripCard);
            });
        }
    }
});
