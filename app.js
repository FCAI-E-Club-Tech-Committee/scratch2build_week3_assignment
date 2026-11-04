// 1. Select DOM Elements
const eventForm = document.querySelector('#event-form');
const titleInput = document.querySelector('#event-title');
const descriptionInput = document.querySelector('#event-description');
const categoryInput = document.querySelector('#event-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-filter');
const eventsContainer = document.querySelector('#events-container');
const counterDisplay = document.querySelector('#event-count');
const emptyMessage = document.querySelector('#empty-message');

// 2. Handle Form Submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    if (title.length < 3 || !category) {
        errorMessage.textContent = 'Please enter a title (min 3 chars) and pick a category.';
        return;
    }

    addEventCard(title, description, category);
    eventForm.reset();
    errorMessage.textContent = '';
    filterEvents();
});

// 3. Add a new card to the page
function addEventCard(title, description, category) {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.dataset.category = category;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description');
    cardDescription.textContent = description;

    const badge = document.createElement('span');
    badge.classList.add('category-badge');
    badge.textContent = category;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn-delete');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(badge);
    card.appendChild(deleteBtn);
    eventsContainer.appendChild(card);
}

// 4. Event Delegation for Card Deletion
eventsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const card = e.target.closest('.event-card');
        card.remove();
        filterEvents();
    }
});

// 5. Filter Function (Combined Search + Category)
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

    counterDisplay.textContent = `Showing ${count} Events`;

    if (count === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

// 6. Live Search and Category Filter
searchInput.addEventListener('input', filterEvents);
categorySelect.addEventListener('change', filterEvents);

filterEvents();