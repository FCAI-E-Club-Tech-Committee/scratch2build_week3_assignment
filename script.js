const form = document.getElementById('event-form');
const titleInput = document.getElementById('title-input');
const categoryInput = document.getElementById('category-input');
const errorMessage = document.getElementById('error-message');

const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

const list = document.getElementById('event-list');
const counter = document.getElementById('counter');
const emptyState = document.getElementById('empty-state');

let events = [];
let searchTerm = '';
let activeCategory = 'All';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const category = categoryInput.value;

  if (title.length < 3) {
    errorMessage.textContent = 'Title must be at least 3 characters.';
    return;
  }
  if (category === '') {
    errorMessage.textContent = 'Please choose a category.';
    return;
  }

  errorMessage.textContent = '';
  events.push({ id: Date.now(), title, category });
  form.reset();
  render();
});

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase().trim();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
    render();
  });
});

list.addEventListener('click', (e) => {
  if (!e.target.classList.contains('delete-btn')) return;
  const id = Number(e.target.dataset.id);
  events = events.filter((ev) => ev.id !== id);
  render();
});

function render() {
  const visible = events.filter((ev) => {
    const matchesSearch = ev.title.toLowerCase().includes(searchTerm);
    const matchesCategory =
      activeCategory === 'All' || ev.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  list.innerHTML = '';

  visible.forEach((ev) => {
    const li = document.createElement('li');
    li.className = 'event-card';

    const title = document.createElement('span');
    title.className = 'event-title';
    title.textContent = ev.title;

    const badge = document.createElement('span');
    badge.className = 'badge ' + ev.category.toLowerCase();
    badge.textContent = ev.category;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.dataset.id = ev.id;
    del.textContent = 'Delete';

    li.append(title, badge, del);
    list.appendChild(li);
  });

  counter.textContent = visible.length + ' event(s) shown';
  emptyState.hidden = visible.length !== 0;
}

render();