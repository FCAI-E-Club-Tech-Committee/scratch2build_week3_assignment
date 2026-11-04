const eventForm = document.querySelector('#event-form');
const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const eventsContainer = document.querySelector('#events-container');
const counterDisplay = document.querySelector('#active-counter');


function addEventCard(title, category) {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.dataset.category = category;
    
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    const badge = document.createElement('span');
    badge.classList.add('badge');
    badge.textContent = category;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn-delete');
    deleteBtn.textContent = 'Delete';

    card.appendChild(cardTitle);
    card.appendChild(badge);
    card.appendChild(deleteBtn);
    eventsContainer.appendChild(card);
}

// 2. Handle Form Submission 
eventForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh! 
    
    const title = document.querySelector('#title-input').value.trim();
    const category = document.querySelector('#category-input').value;
    if (title.length < 3 || !category) {
        const errorMessage = document.querySelector('#form-error');
        errorMessage.textContent = 'Please enter a title (min 3 chars) and pick a category.';
        errorMessage.hidden = false;
        return;
    }
    else {
        const errorMessage = document.querySelector('#form-error');
        errorMessage.hidden = true;
    }
    addEventCard(title, category);
    
    eventForm.reset();
    filterEvents();
});
// 3. Event Delegation for Card Deletion 
eventsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const card = e.target.closest('.event-card');
        card.remove();
        filterEvents();
    }
});

// 4. Filter Function (Combined Search + Category) 
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
    counterDisplay.textContent = `Showing ${count} event(s)`;
    
    if (count === 0) {
        const noEventsMsg = document.querySelector('#no-events-msg');
        noEventsMsg.hidden = false;
        noEventsMsg.textContent = 'No events found.';
        eventsContainer.appendChild(noEventsMsg);
    } else {
        const noEventsMsg = document.querySelector('#no-events-msg');
        if (noEventsMsg) {
            noEventsMsg.hidden = true;
        }
    }
}

searchInput.addEventListener('input', filterEvents);
categorySelect.addEventListener('change', filterEvents);