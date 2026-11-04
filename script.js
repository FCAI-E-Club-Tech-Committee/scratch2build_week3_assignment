// 1. Select DOM Elements
const eventForm = document.querySelector('#event-form');
const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const eventsContainer = document.querySelector('#events-container');
const counterDisplay = document.querySelector('#active-counter');

// 2. Handle Form Submission & Validation
eventForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh[span_5](start_span)[span_5](end_span)[span_6](start_span)[span_6](end_span)!
    
    const titleInput = document.querySelector('#title-input');
    const categoryInput = document.querySelector('#category-input');
    
    const title = titleInput.value.trim();
    const category = categoryInput.value;

    // Validation: Title >= 3 chars and Category is selected
    if (title.length < 3 || !category) {
        alert('Please enter a title (min 3 chars) and pick a category.');
        return;
    }

    addEventCard(title, category);
    eventForm.reset();
    filterEvents();
});

// Helper function to dynamically add event cards
function addEventCard(title, category) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.category = category;

    card.innerHTML = `
        <h3 class="card-title">${title}</h3>
        <span class="badge ${category}">${category.toUpperCase()}</span>
        <button class="btn-delete">Delete</button>
    `;

    eventsContainer.appendChild(card);
}

// 3. Event Delegation for Card Deletion
eventsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const card = e.target.closest('.event-card');
        card.remove();
        filterEvents(); // Update counters and states after removal
    }
});

// 4. Listen to live input/change events for Search and Category filters
searchInput.addEventListener('input', filterEvents);
categorySelect.addEventListener('change', filterEvents);

// 4. Filter Function (Combined Search & Category + Empty State)
function filterEvents() {
    const query = searchInput.value.toLowerCase();
    const selectedCat = categorySelect.value;
    const cards = eventsContainer.querySelectorAll('.event-card');
    let count = 0;

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = title.includes(query);
        const matchesCat = (selectedCat === 'all' || category === selectedCat);

        if (matchesSearch && matchesCat) {
            card.style.display = 'block';
            count++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update Live Counter
    counterDisplay.textContent = `Showing ${count} Events`;

    // Handle Empty State ("No events found")
    let emptyMsg = eventsContainer.querySelector('.no-events');
    if (count === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.className = 'no-events';
            emptyMsg.textContent = 'No events found.';
            eventsContainer.appendChild(emptyMsg);
        }
    } else {
        if (emptyMsg) {
            emptyMsg.remove();
        }
    }
}