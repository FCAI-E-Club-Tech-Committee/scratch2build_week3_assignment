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

//========================================================================

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
});
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

const filterList = document.querySelector('#filter-category');
const eventList = document.querySelector('#event-list');

filterList.addEventListener('change', (event) => {
    const chosenCategory = event.target.value;

    if (chosenCategory === 'all') {
        delete eventList.dataset.filter;
    }
    else {
        eventList.dataset.filter = chosenCategory;
    }
});
