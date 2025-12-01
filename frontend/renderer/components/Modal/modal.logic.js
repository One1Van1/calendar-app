// Modal Component - Logic

import { apiService } from '../../services/api.service.js';
import { dateUtils } from '../../utils/date.utils.js';
import { modalView } from './modal.view.js';

export class ModalComponent {
    constructor(sidebarComponent, onEventCreated) {
        this.sidebarComponent = sidebarComponent;
        this.onEventCreated = onEventCreated;
        this.isOpen = false;
    }

    initialize() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const newEventBtn = document.getElementById('newEventBtn');
        const closeModal = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancelBtn');
        const eventForm = document.getElementById('eventForm');
        const eventModal = document.getElementById('eventModal');

        newEventBtn?.addEventListener('click', () => this.show());
        closeModal?.addEventListener('click', () => this.hide());
        cancelBtn?.addEventListener('click', () => this.hide());
        eventForm?.addEventListener('submit', (e) => this.handleSubmit(e));

        window.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                this.hide();
            }
        });
    }

    show() {
        this.isOpen = true;
        
        // Set default dates
        const now = new Date();
        const endTime = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour

        const categories = this.sidebarComponent.getCategoriesForSelect();
        
        modalView.show({
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
        
        const eventData = {
            title: formData.title,
            description: formData.description || undefined,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            allDay: formData.allDay,
            categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
        };

        try {
            await apiService.createEvent(eventData);
            this.hide();
            if (this.onEventCreated) {
                this.onEventCreated();
            }
        } catch (error) {
            alert('Ошибка при создании события');
        }
    }
}
