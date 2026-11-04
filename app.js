const eventForm=document.querySelector("#event-form");
const titleInput=document.querySelector("#title-input");
const categoryInput=document.querySelector("#category-input");
const descriptionInput=document.querySelector("#description-input");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const eventsContainer = document.querySelector("#events-container");
const counterDisplay = document.querySelector("#active-counter");
const emptyState = document.querySelector("#empty-state");

eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();

    if (title.length < 3 || category === "" || description.length < 10) {
        alert("Please enter a valid title, category, and description");
        return;
    }

    addEvent(title, category,description);
    eventForm.reset();
    searchEvents();
});

function addEvent(title, category, description) {
    const card=document.createElement("article");
    card.classList.add("event-card");
    card.dataset.category=category;

    const heading=document.createElement("h3");
    heading.textContent=title;
    heading.classList.add("card-title");

    const badge=document.createElement("span");
    badge.classList.add("category-badge");
    badge.textContent=category;

    const deleteButton=document.createElement("button");
    deleteButton.type="button";
    deleteButton.textContent="Delete";
    deleteButton.classList.add("btn-delete");

    const descriptionElement=document.createElement("p");
    descriptionElement.textContent=description;
    descriptionElement.classList.add("card-description");

    card.append(heading, badge, descriptionElement, deleteButton);
    eventsContainer.appendChild(card);
}

function searchEvents() {
    const query=searchInput.value.trim().toLowerCase();
    const selectedCategory=categorySelect.value;
    const cards=document.querySelectorAll(".event-card");
    let count=0;
    cards.forEach((card) => {
        const title=card.querySelector(".card-title").textContent.toLowerCase();
        const category=card.dataset.category.toLowerCase();
        const matchesSearch=title.includes(query);
        const matchesCategory=selectedCategory === "all" || category === selectedCategory.toLowerCase();
        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            count++;
        } else {
            card.style.display = "none";
        }
    });
    counterDisplay.textContent = `Showing ${count} events`;
    emptyState.style.display = count === 0 ? "block" : "none";
}
searchInput.addEventListener("input", searchEvents);

categorySelect.addEventListener("change",  searchEvents);
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const card = e.target.closest(".event-card");

        card.remove();
        searchEvents();
    }
});