// Check if user is logged in before showing main page
requireAuth();

// Dummy Data for Trips
const destinations = [
    {
        id: 1,
        title: "Kyoto, Japan",
        price: "$2,400",
        duration: "10 Days",
        image: "Kyoto.avif",
        description: "Experience the timeless beauty of Japan. Visit ancient temples, walk through the Fushimi Inari Shrine, and witness the magical cherry blossom season.",
        highlights: ["Tea Ceremony", "Bamboo Forest", "Bullet Train Ride"]
    },
    {
        id: 2,
        title: "Santorini, Greece",
        price: "$3,100",
        duration: "7 Days",
        image: "Santorini.webp",
        description: "Relax in the whitewashed buildings of Oia, watch the world-famous sunsets, and swim in the crystal-clear Aegean Sea on this romantic getaway.",
        highlights: ["Sunset Dinner", "Volcano Tour", "Wine Tasting"]
    },
    {
        id: 3,
        title: "Bali, Indonesia",
        price: "$1,200",
        duration: "14 Days",
        image: "Bali.avif",
        description: "A tropical paradise awaits. From the spiritual vibes of Ubud to the beach parties in Seminyak, Bali offers a diverse experience for every traveler.",
        highlights: ["Monkey Forest", "Surfing Lessons", "Rice Terraces"]
    },
    {
        id: 4,
        title: "Reykjavik, Iceland",
        price: "$2,800",
        duration: "6 Days",
        image: "Rejavik.avif",
        description: "Hunt for the Northern Lights and soak in the Blue Lagoon. Iceland offers dramatic landscapes, waterfalls, and volcanic terrain.",
        highlights: ["Northern Lights", "Golden Circle", "Blue Lagoon"]
    },
    {
        id: 5,
        title: "Machu Picchu, Peru",
        price: "$1,900",
        duration: "9 Days",
        image: "Machu.avif",
        description: "Trek the Inca Trail to the lost city of Machu Picchu. Explore the Sacred Valley and enjoy the rich culture and cuisine of Cusco.",
        highlights: ["Inca Trail", "Cusco City Tour", "Alpaca Farm"]
    },
    {
        id: 6,
        title: "Banff, Canada",
        price: "$1,800",
        duration: "8 Days",
        image: "Banff.jpeg",
        description: "Escape to the mountains. Witness the turquoise waters of Lake Louise and hike through the breathtaking trails of the Canadian Rockies.",
        highlights: ["Lake Louise", "Gondola Ride", "Wildlife Spotting"]
    },
    {
        id: 7,
        title: "Amsterdam, USA",
        price: "$3,400",
        duration: "7 Days",
        image: "Amsterdam.jpeg",
        description: "Amsterdam is a charming city of canals, bicycles, and historic architecture. It blends world‑class museums with vibrant cafés and lively neighborhoods.",
        highlights: ["Anne Frank House", "Van Gogh museum", "Canals of Amsterdam"]
    }
];

// Selectors
const grid = document.getElementById('destinationGrid');
const modal = document.getElementById('tripModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const searchInput = document.getElementById('searchInput');

// Render Destinations
function renderDestinations(data) {
    grid.innerHTML = '';
    data.forEach(trip => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${trip.image}" alt="${trip.title}" class="card-img">
            <div class="card-content">
                <div class="card-header">
                    <span class="destination-title">${trip.title}</span>
                    <span class="price">${trip.price}</span>
                </div>
                <span class="duration"><i class="far fa-clock"></i> ${trip.duration}</span>
                <p class="card-desc">${trip.description}</p>
                <button class="card-btn" onclick="openModal(${trip.id})">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initial Render
renderDestinations(destinations);

// Filter Functionality
function filterDestinations() {
    const query = searchInput.value.toLowerCase();
    const filtered = destinations.filter(trip => 
        trip.title.toLowerCase().includes(query) || 
        trip.description.toLowerCase().includes(query)
    );
    renderDestinations(filtered);
}

// Search input event listener
searchInput.addEventListener('keyup', filterDestinations);

// Modal Functionality
function openModal(id) {
    const trip = destinations.find(t => t.id === id);
    if (!trip) return;

    modalBody.innerHTML = `
        <img src="${trip.image}" alt="${trip.title}">
        <h2>${trip.title}</h2>
        <span class="meta">${trip.duration} | ${trip.price} per person</span>
        <p>${trip.description}</p>
        <br>
        <h3>Trip Highlights:</h3>
        <ul style="list-style-type: disc; margin-left: 20px; color: #555;">
            ${trip.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
    `;
    
    // Update the Book This Trip button with the trip ID
    const bookButton = document.querySelector('.modal-footer .btn-primary');
    bookButton.onclick = () => bookTrip(id);
    
    modal.style.display = 'flex';
}

// Book Trip Function
function bookTrip(tripId) {
    if (!Auth.isLoggedIn()) {
        alert('Please login to book a trip');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = `booking.html?tripId=${tripId}`;
}

function closeModal() {
    modal.style.display = 'none';
}

// Event Listeners for Modal
closeBtn.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Form Handling
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you! Our agent will contact you shortly to plan your trip.");
    e.target.reset();
});