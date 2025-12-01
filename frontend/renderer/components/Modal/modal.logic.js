// Modal Component - Logic

import { apiService } from '../../services/api.service.js';
import { dateUtils } from '../../utils/date.utils.js';
import { modalView } from './modal.view.js';

export class ModalComponent {
    constructor(sidebarComponent, onEventCreated) {
        this.sidebarComponent = sidebarComponent;
        this.onEventCreated = onEventCreated;
        this.isOpen = false;
        this.currentType = 'event'; // event, task, reminder
    }

    initialize() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeModal = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancelBtn');
        const eventForm = document.getElementById('eventForm');
        const eventModal = document.getElementById('eventModal');

        closeModal?.addEventListener('click', () => this.hide());
        cancelBtn?.addEventListener('click', () => this.hide());
        eventForm?.addEventListener('submit', (e) => this.handleSubmit(e));

        window.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                this.hide();
            }
        });
    }

    show(type = 'event', date = null) {
        this.isOpen = true;
        this.currentType = type;
        
        // Set default dates
        const now = date ? new Date(date) : new Date();
        const endTime = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour

        const categories = this.sidebarComponent.getCategoriesForSelect();
        
        const titles = {
            event: 'Создать событие',
            task: 'Создать задачу',
            reminder: 'Создать напоминание'
        };
        
        modalView.show({
            type: type,
            title: titles[type],
            startDate: dateUtils.formatDateTimeLocal(now),
            endDate: dateUtils.formatDateTimeLocal(endTime),
            categories
        });
    }

    hide() {
        this.isOpen = false;
        modalView.hide();
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = modalView.getFormData();
        
        try {
            if (this.currentType === 'event') {
                await this.createEvent(formData);
            } else if (this.currentType === 'task') {
                await this.createTask(formData);
            } else if (this.currentType === 'reminder') {
                await this.createReminder(formData);
            }

            this.hide();
            if (this.onEventCreated) {
                this.onEventCreated();
            }
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Ошибка при создании');
        }
    }

    async createEvent(formData) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        const eventData = {
            name: formData.title,
            description: formData.description || undefined,
            date: startDate.toISOString().split('T')[0],
            startTime: startDate.toTimeString().split(' ')[0],
            endTime: endDate.toTimeString().split(' ')[0],
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        };

        await apiService.createEvent(eventData);
    }

    async createTask(formData) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        const taskData = {
            name: formData.title,
            description: formData.description || undefined,
            date: startDate.toISOString().split('T')[0],
            startTime: startDate.toTimeString().split(' ')[0],
            endTime: endDate.toTimeString().split(' ')[0],
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        };

        await apiService.createTask(taskData);
    }

    async createReminder(formData) {
        const reminderDate = new Date(formData.startDate);

        const reminderData = {
            name: formData.title,
            description: formData.description || undefined,
            date: reminderDate.toISOString().split('T')[0],
            time: reminderDate.toTimeString().split(' ')[0],
        };

        await apiService.createReminder(reminderData);
    }
}
