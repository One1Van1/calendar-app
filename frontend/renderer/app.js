// API Base URL
const API_BASE = 'http://localhost:3000';

// State
let currentDate = new Date();
let categories = [];
let events = [];
let currentTheme = localStorage.getItem('theme') || 'light';

// DOM Elements
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthSpan = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const todayBtn = document.getElementById('todayBtn');
const newEventBtn = document.getElementById('newEventBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const eventModal = document.getElementById('eventModal');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const eventForm = document.getElementById('eventForm');
const categoriesList = document.getElementById('categoriesList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    setupEventListeners();
    loadCategories();
    renderCalendar();
});

// Theme functions
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    newEventBtn.addEventListener('click', showModal);
    closeModal.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
    eventForm.addEventListener('submit', handleCreateEvent);

    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            hideModal();
        }
    });
}

// API Functions
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function fetchEventsForMonth(year, month) {
    try {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59);
        
        const response = await fetch(
            `${API_BASE}/events/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

async function createEvent(eventData) {
    try {
        const response = await fetch(`${API_BASE}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

// UI Functions
async function loadCategories() {
    categories = await fetchCategories();
    renderCategories();
    updateCategorySelect();
}

function renderCategories() {
    categoriesList.innerHTML = categories.map(cat => `
        <div class="category-item" data-id="${cat.id}">
            <span class="category-color" style="background: ${cat.color}"></span>
            <span>${cat.name}</span>
        </div>
    `).join('');
}

function updateCategorySelect() {
    const select = document.getElementById('eventCategory');
    select.innerHTML = '<option value="">Без категории</option>' +
        categories.map(cat => `
            <option value="${cat.id}">${cat.name}</option>
        `).join('');
}

async function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    currentMonthSpan.textContent = currentDate.toLocaleDateString('ru-RU', { 
        month: 'long', 
        year: 'numeric' 
    });

    // Load events
    events = await fetchEventsForMonth(year, month);

    // Build calendar
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayWeek = firstDay.getDay() || 7; // Monday = 1
    const daysInMonth = lastDay.getDate();
    const prevDaysInMonth = prevLastDay.getDate();

    let html = `
        <div class="calendar-weekdays">
            <div class="calendar-weekday">Пн</div>
            <div class="calendar-weekday">Вт</div>
            <div class="calendar-weekday">Ср</div>
            <div class="calendar-weekday">Чт</div>
            <div class="calendar-weekday">Пт</div>
            <div class="calendar-weekday">Сб</div>
            <div class="calendar-weekday">Вс</div>
        </div>
        <div class="calendar-days">
    `;

    // Previous month days
    for (let i = firstDayWeek - 2; i >= 0; i--) {
        const day = prevDaysInMonth - i;
        html += `<div class="calendar-day other-month"><div class="calendar-day-number">${day}</div></div>`;
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const dayEvents = events.filter(e => {
            const eventDate = new Date(e.startDate);
            return eventDate.getDate() === day;
        });

        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${date.toISOString()}">
                <div class="calendar-day-number">${day}</div>
                ${dayEvents.length > 0 ? `
                    <div class="calendar-day-events">
                        ${dayEvents.slice(0, 3).map(e => `
                            <div class="event-dot" style="background: ${getCategoryColor(e.categoryId)}"></div>
                        `).join('')}
                        ${dayEvents.length > 3 ? `+${dayEvents.length - 3}` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Next month days
    const remainingDays = 42 - (firstDayWeek - 1 + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        html += `<div class="calendar-day other-month"><div class="calendar-day-number">${day}</div></div>`;
    }

    html += '</div>';
    calendarGrid.innerHTML = html;
}

function getCategoryColor(categoryId) {
    if (!categoryId) return '#999';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#999';
}

function showModal() {
    eventModal.classList.add('show');
    
    // Set default dates
    const now = new Date();
    const startInput = document.getElementById('eventStartDate');
    const endInput = document.getElementById('eventEndDate');
    
    startInput.value = formatDateTimeLocal(now);
    
    const endTime = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
    endInput.value = formatDateTimeLocal(endTime);
}

function hideModal() {
    eventModal.classList.remove('show');
    eventForm.reset();
}

function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function handleCreateEvent(e) {
    e.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const startDate = document.getElementById('eventStartDate').value;
    const endDate = document.getElementById('eventEndDate').value;
    const categoryId = document.getElementById('eventCategory').value;
    const allDay = document.getElementById('eventAllDay').checked;

    const eventData = {
        title,
        description: description || undefined,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        allDay,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
    };

    try {
        await createEvent(eventData);
        hideModal();
        renderCalendar(); // Reload calendar
    } catch (error) {
        alert('Ошибка при создании события');
    }
}
