# Scratch2Build - Assignment 3
## Interactive Event Filter App

Welcome to Assignment 3 of the FCAI E-Club Scratch2Build Web Development Track!

This project focuses on building an interactive Event Filter Application using HTML, CSS, and Vanilla JavaScript.

The application allows users to create events, delete them, search through existing events, and filter them by category without refreshing the page.

## 🎯 Project Objectives

The main objective is to apply DOM Manipulation and Event-Driven Programming concepts in a practical application.

## ✨ Features

### 1. Interactive Form & Validation
- Capture form submissions using `addEventListener('submit', ...)`.
- Prevent page refresh using `e.preventDefault()`.
- Validate that event titles contain at least 3 characters.
- Ensure that a category is selected.
- Display clear validation messages.
- Reset the form after successful submission.

### 2. Dynamic DOM Insertion & Deletion
- Dynamically create new event cards.
- Display event titles and category badges.
- Delete event cards using Event Delegation.

### 3. Search & Category Filters
- Search events in real time using the `input` event.
- Filter events by title keywords.
- Filter events by category:
  - All
  - Tech
  - Workshop
  - Social
- Allow search and category filters to work together.

### 4. Live Counter & Empty State
- Display the number of currently visible events.
- Update the counter dynamically.
- Display a "No events found" message when no events match the selected filters.

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- DOM Manipulation
- Event Listeners
- Event Delegation
- Array Methods

## 📂 Project Structure

```text
scratch2build-week3-event-filter/
│
├── index.html
├── styles.css
├── app.js
└── README.md
