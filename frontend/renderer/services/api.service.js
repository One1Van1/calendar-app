// API Service - вся логика работы с API
const API_BASE = 'http://localhost:3000';

export const apiService = {
    // Categories
    async fetchCategories() {
        try {
            const response = await fetch(`${API_BASE}/categories`);
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    async createCategory(categoryData) {
        try {
            const response = await fetch(`${API_BASE}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    // Events
    async fetchEventsForMonth(year, month) {
        try {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);
            
            const response = await fetch(
                `${API_BASE}/events?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    },

    async createEvent(eventData) {
        try {
            const response = await fetch(`${API_BASE}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    },

    async updateEvent(id, eventData) {
        try {
            const response = await fetch(`${API_BASE}/events/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    },

    async deleteEvent(id) {
        try {
            const response = await fetch(`${API_BASE}/events/${id}`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    },

    // Tasks
    async fetchTasksForMonth(year, month) {
        try {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);
            
            const response = await fetch(
                `${API_BASE}/tasks?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    },

    async createTask(taskData) {
        try {
            const response = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    async updateTask(id, taskData) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    async deleteTask(id) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    async toggleTaskSubtask(taskId, subtaskId) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}/subtasks/${subtaskId}/toggle`, {
                method: 'PATCH',
            });
            return await response.json();
        } catch (error) {
            console.error('Error toggling task subtask:', error);
            throw error;
        }
    },

    // Reminders
    async fetchRemindersForMonth(year, month) {
        try {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);
            
            const allReminders = await fetch(`${API_BASE}/reminders`).then(r => r.json());
            
            // Фильтруем по диапазону на клиенте
            return allReminders.filter(reminder => {
                const reminderDate = new Date(reminder.date);
                return reminderDate >= startDate && reminderDate <= endDate;
            });
        } catch (error) {
            console.error('Error fetching reminders:', error);
            return [];
        }
    },

    async createReminder(reminderData) {
        try {
            const response = await fetch(`${API_BASE}/reminders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reminderData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating reminder:', error);
            throw error;
        }
    },

    async updateReminder(id, reminderData) {
        try {
            const response = await fetch(`${API_BASE}/reminders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reminderData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating reminder:', error);
            throw error;
        }
    },

    async deleteReminder(id) {
        try {
            const response = await fetch(`${API_BASE}/reminders/${id}`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting reminder:', error);
            throw error;
        }
    }
};

