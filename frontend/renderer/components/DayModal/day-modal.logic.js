// Day Modal Component - Logic

import { dayModalView } from './day-modal.view.js';

export class DayModalComponent {
    constructor() {
        this.isOpen = false;
        this.currentDate = null;
        this.events = [];
    }

    initialize() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const modal = document.getElementById('dayModal');
        const closeBtn = document.querySelector('#dayModal .close');

        closeBtn?.addEventListener('click', () => this.close());

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
    }

    open(date, events) {
        this.isOpen = true;
        this.currentDate = date;
        this.events = events || [];
        
        dayModalView.show(date, events);
    }

    close() {
        this.isOpen = false;
        dayModalView.hide();
    }

    getFormattedDate(date) {
        return new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
    }
}
