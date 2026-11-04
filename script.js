//========================================================================
//================== Helper Functions ====================================
//========================================================================

function capitalize(str) {
    if (str.length == 0) {
        return str;
    }
    
    let newString = "";
    newString += str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
        newString += str[i].toLowerCase();
    }
    
    return newString;
}

function updateCounter() {
    const eventCards = eventList.querySelectorAll('.event-card');
    const eventCounter = document.querySelector('#events-counter');

    let counter = 0;
    eventCards.forEach((card) => {
        if (window.getComputedStyle(card).display !== 'none') {
            counter++;
        }
    });

    eventCounter.textContent = counter === 0 ? 'No Events to show' : `Showing ${counter} events`;
}

//========================================================================
//========================== Adding Events ===============================
//========================================================================
const eventCounter = document.querySelector('#events-counter');

const eventForm = document.querySelector('#add-event-form');
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const selectedCategory = document.querySelector('#category-list');
    const titleInput = document.querySelector('#title-input');
    const eventTitle = titleInput.value.trim();
    
    if (eventTitle.length < 3) {
        return;
    }
    
    let eventCategory = selectedCategory.value;
    
    const newEvent = document.createElement('div');
    newEvent.classList.add('event-card');
    newEvent.classList.add(`${eventCategory}-event`);
    newEvent.innerHTML = `
    <span class="event-title">${eventTitle}</span>
    <div class="category ${eventCategory}">${capitalize(eventCategory)}</div>
    `;
    
    const eventList = document.querySelector('#event-list');
    eventList.appendChild(newEvent);
    
    titleInput.value = '';

    updateCounter();
});

//========================================================================
//================== Validate Title Input ================================
//========================================================================

const titleInput = document.querySelector('#title-input');

titleInput.addEventListener('input', (e) => {
    const errorMessage = document.querySelector('#error-message');
    
    const title = titleInput.value.trim();
    if (title.length < 3 && title.length > 0) {
        errorMessage.style.display = 'block';
    }
    else {
        errorMessage.style.display = 'none';
    }
});

//========================================================================
//================== Filtering Events ====================================
//========================================================================

const filterList = document.querySelector('#filter-category');
const eventList = document.querySelector('#event-list');

filterList.addEventListener('change', (event) => {
    const chosenCategory = event.target.value;

    let nEvents = 0;
    if (chosenCategory === 'all') {
        delete eventList.dataset.filter;
    }
    else {
        eventList.dataset.filter = chosenCategory;
    }
    
    updateCounter();
});


//========================================================================
//================== Searching For Events ================================
//========================================================================

const searchForm = document.querySelector('#event-search-form');
const searchFieldInput = document.querySelector('#event-search-input');
const eventCards = document.querySelectorAll('.event-card');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const searchText = searchFieldInput.value.toLowerCase();
    const chosenCategory = filterList.value;
    
    let eventCount = 0;
    eventCards.forEach((card) => {
        const eventTitle = card.querySelector('span').textContent.toLowerCase();
        const eventCategory = card.querySelector('div').textContent.toLowerCase();

        const isSameCategory = (eventCategory === chosenCategory || chosenCategory === 'all');

        if (eventTitle.includes(searchText) && isSameCategory) {
            card.style.display = 'flex';
            eventCount++;
        }
        else {
            card.style.display = 'none';
        }
    });
    eventCounter.textContent = eventCount === 0 ? 'No Events to show' : `Showing ${eventCount} events`;
    searchForm.reset();
});

//========================================================================
//================== Deleting ============================================
//========================================================================

eventList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-event');

    deleteButton.closest('.event-card').remove();

    updateCounter();
});
