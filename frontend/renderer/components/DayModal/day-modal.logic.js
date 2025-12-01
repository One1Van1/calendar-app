// Day Modal Component - Logic

import { dayModalView } from './day-modal.view.js';
import { apiService } from '../../services/api.service.js';

export class DayModalComponent {
    constructor() {
        this.isOpen = false;
        this.currentDate = null;
        this.events = [];
        this.tasks = [];
        this.reminders = [];
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

    async open(date, events = []) {
        this.isOpen = true;
        this.currentDate = date;
        this.events = events || [];
        
        // Загружаем tasks и reminders для этого дня
        try {
            const dateStr = date.toISOString().split('T')[0];
            const [allTasks, allReminders] = await Promise.all([
                apiService.fetchTasksForMonth(date.getFullYear(), date.getMonth()),
                apiService.fetchRemindersForMonth(date.getFullYear(), date.getMonth())
            ]);

            // Фильтруем по конкретному дню
            this.tasks = allTasks.filter(task => task.date === dateStr);
            this.reminders = allReminders.filter(reminder => reminder.date === dateStr);
        } catch (error) {
            console.error('Error loading day data:', error);
            this.tasks = [];
            this.reminders = [];
        }
        
        dayModalView.show(date, this.events, this.tasks, this.reminders, this);
    }

    async toggleSubtask(taskId, subtaskId) {
        try {
            const updated = await apiService.toggleTaskSubtask(taskId, subtaskId);
            
            // Обновить локальные данные
            const taskIndex = this.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = updated;
            }

            // Перерисовать модальное окно
            dayModalView.show(this.currentDate, this.events, this.tasks, this.reminders, this);
        } catch (error) {
            console.error('Error toggling subtask:', error);
            alert('Ошибка при обновлении подзадачи');
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
