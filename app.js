// ==========================================================
// Event Board — logic
// ==========================================================

// 1. Select DOM elements
const eventForm = document.querySelector('#event-form');
const titleInput = document.querySelector('#title-input');
const categoryInput = document.querySelector('#category-input');
const formMessage = document.querySelector('#form-message');
const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const eventsContainer = document.querySelector('#events-container');
const counterDisplay = document.querySelector('#active-counter');
const emptyState = document.querySelector('#empty-state');

const MIN_TITLE_LENGTH = 3;

// Readable names for each category value
const CATEGORY_LABELS = {
    tech: 'Tech',
    workshop: 'Workshop',
    social: 'Social'
};

// 2. Inline form messages (no alerts)
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.dataset.type = type; // "error" or "success"
    formMessage.hidden = false;
}

function clearMessage() {
    formMessage.textContent = '';
    formMessage.hidden = true;
    delete formMessage.dataset.type;
    titleInput.removeAttribute('aria-invalid');
    categoryInput.removeAttribute('aria-invalid');
}

// 3. Create a card and add it to the live page
function addEventCard(title, category) {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.dataset.category = category;

    const badge = document.createElement('span');
    badge.className = 'card-category';
    badge.textContent = CATEGORY_LABELS[category];

    // textContent (not innerHTML) so typed text can never inject HTML
    const heading = document.createElement('h3');
    heading.className = 'card-title';
    heading.textContent = title;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete ${title}`);

    card.append(badge, heading, deleteBtn);
    eventsContainer.prepend(card); // newest event appears first
}

// 4. Handle form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the browser from refreshing the page
    clearMessage();

    const title = titleInput.value.trim();
    const category = categoryInput.value;

    const titleIsValid = title.length >= MIN_TITLE_LENGTH;
    const categoryIsValid = Object.hasOwn(CATEGORY_LABELS, category);

    if (!titleIsValid || !categoryIsValid) {
        const problems = [];

        if (!titleIsValid) {
            problems.push(`enter a title with at least ${MIN_TITLE_LENGTH} characters`);
            titleInput.setAttribute('aria-invalid', 'true');
        }
        if (!categoryIsValid) {
            problems.push('choose a category');
            categoryInput.setAttribute('aria-invalid', 'true');
        }

        showMessage(`Please ${problems.join(' and ')}.`, 'error');
        (titleIsValid ? categoryInput : titleInput).focus();
        return;
    }

    addEventCard(title, category);
    eventForm.reset();
    showMessage(`"${title}" was added.`, 'success');
    titleInput.focus();
    filterEvents();
});

// Clear the error as soon as the user starts fixing the form
titleInput.addEventListener('input', clearMessage);
categoryInput.addEventListener('change', clearMessage);

// 5. Delete cards with event delegation on the main container
eventsContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete');
    if (!deleteBtn) return;

    deleteBtn.closest('.event-card').remove();
    filterEvents();
});

// 6. Filter by search keyword + category together
function filterEvents() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCat = categorySelect.value; // 'all' | 'tech' | 'workshop' | 'social'
    const cards = eventsContainer.querySelectorAll('.event-card');
    let count = 0;

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const matchesSearch = title.includes(query);
        const matchesCat = selectedCat === 'all' || card.dataset.category === selectedCat;
        const isVisible = matchesSearch && matchesCat;

        card.hidden = !isVisible;
        if (isVisible) count++;
    });

    // Live counter
    counterDisplay.textContent = `Showing ${count} ${count === 1 ? 'Event' : 'Events'}`;

    // "No events found" message when nothing matches
    emptyState.hidden = count > 0;
}

// 7. Live filtering as the user types or changes category
searchInput.addEventListener('input', filterEvents);
categorySelect.addEventListener('change', filterEvents);

// 8. Run once on load so the counter shows the real number
filterEvents();