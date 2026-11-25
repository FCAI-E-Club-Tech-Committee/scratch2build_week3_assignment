const eventForm = document.querySelector('#event-form');
const titleInput = document.querySelector('#title-input');
const categoryInput = document.querySelector('#category-input');
const formError = document.querySelector('#form-error');

const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const eventsContainer = document.querySelector('#events-container');
const counterDisplay = document.querySelector('#active-counter');
const emptyState = document.querySelector('#empty-state');

function formatCategoryLabel(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function addEventCard(title, category) {
  const card = document.createElement('article');
  card.className = 'event-card';
  card.dataset.category = category;

  const header = document.createElement('div');
  header.className = 'card-header';

  const badge = document.createElement('span');
  badge.className = `badge badge-${category}`;
  badge.textContent = formatCategoryLabel(category);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn-delete';
  deleteBtn.setAttribute('aria-label', 'Delete event');
  deleteBtn.textContent = 'Delete';

  const cardTitle = document.createElement('h3');
  cardTitle.className = 'card-title';
  cardTitle.textContent = title;

  header.append(badge, deleteBtn);
  card.append(header, cardTitle);
  eventsContainer.prepend(card);
}

eventForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const title = titleInput.value.trim();
  const category = categoryInput.value;

  if (title.length < 3) {
    formError.textContent = 'Event title must be at least 3 characters long.';
    formError.hidden = false;
    titleInput.focus();
    return;
  }

  if (!category) {
    formError.textContent = 'Please select a valid category from the dropdown.';
    formError.hidden = false;
    categoryInput.focus();
    return;
  }

  formError.hidden = true;
  formError.textContent = '';

  addEventCard(title, category);
  eventForm.reset();
  filterEvents();
});

eventsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const card = e.target.closest('.event-card');
    if (card) {
      card.remove();
      filterEvents();
    }
  }
});
function filterEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCat = categorySelect.value;
  const cards = eventsContainer.querySelectorAll('.event-card');
  let visibleCount = 0;

  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = title.includes(query);
    const matchesCat = selectedCat === 'all' || category === selectedCat;

    if (matchesSearch && matchesCat) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  counterDisplay.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'Event' : 'Events'}`;
  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener('input', filterEvents);
categorySelect.addEventListener('change', filterEvents);
filterEvents();
