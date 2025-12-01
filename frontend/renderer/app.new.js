// Main Application Logic

import { HeaderComponent } from './components/Header/header.logic.js';
import { SidebarComponent } from './components/Sidebar/sidebar.logic.js';
import { CalendarComponent } from './components/Calendar/calendar.logic.js';
import { ModalComponent } from './components/Modal/modal.logic.js';
import { initializeBackgrounds } from './init-backgrounds.js';

class App {
    constructor() {
        this.components = {};
    }

    updateDynamicIcon() {
        const iconElement = document.getElementById('dynamicIcon');
        if (iconElement) {
            const currentDate = new Date().getDate();
            iconElement.setAttribute('data-date', currentDate);
        }
        
        // Update every minute to catch day changes
        setInterval(() => {
            const iconElement = document.getElementById('dynamicIcon');
            if (iconElement) {
                const currentDate = new Date().getDate();
                iconElement.setAttribute('data-date', currentDate);
            }
        }, 60000);
    }

    async initialize() {
        // Initialize background styles
        initializeBackgrounds();

        // Update dynamic icon with current date
        this.updateDynamicIcon();

        // Initialize components
        this.components.sidebar = new SidebarComponent();
        await this.components.sidebar.initialize();

        this.components.calendar = new CalendarComponent(this.components.sidebar);
        await this.components.calendar.initialize();

        this.components.header = new HeaderComponent((date) => {
            this.components.calendar.updateDate(date);
            this.components.header.updateMonthDisplay(date);
        });
        this.components.header.initialize();
        this.components.header.updateMonthDisplay(this.components.calendar.currentDate);

        this.components.modal = new ModalComponent(
            this.components.sidebar,
            () => this.components.calendar.render()
        );
        this.components.modal.initialize();
    }
}

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});
