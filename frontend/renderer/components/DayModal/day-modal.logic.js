// Day Modal Component - Logic

import { dayModalView } from './day-modal.view.js';
import { apiService } from '../../services/api.service.js';

export class DayModalComponent {
    constructor() {
        this.isOpen = false;
        this.currentDate = null;
        this.events = [];
        this.singleDayEvents = [];
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

    async open(date, events) {
        this.isOpen = true;
        this.currentDate = date;
        this.events = events || [];
        
        // Загружаем single-day события для этого дня
        this.singleDayEvents = await apiService.fetchSingleDayEventsByDate(date);
        
        dayModalView.show(date, events, this.singleDayEvents, this);
    }

    async toggleChecklistItem(eventId, itemId) {
        // Найти событие и элемент чек-листа
        const event = this.singleDayEvents.find(e => e.id === eventId);
        if (!event || !event.checklist) return;

        const item = event.checklist.find(i => i.id === itemId);
        if (!item) return;

        // Переключить состояние
        item.completed = !item.completed;

        // Обновить на сервере
        try {
            const updated = await apiService.updateChecklist(eventId, event.checklist);
            
            // Обновить локальные данные
            const eventIndex = this.singleDayEvents.findIndex(e => e.id === eventId);
            if (eventIndex !== -1) {
                this.singleDayEvents[eventIndex] = updated;
            }

            // Перерисовать модальное окно
            dayModalView.show(this.currentDate, this.events, this.singleDayEvents, this);
        } catch (error) {
            console.error('Error updating checklist:', error);
            // Откатить изменение при ошибке
            item.completed = !item.completed;
        }
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
