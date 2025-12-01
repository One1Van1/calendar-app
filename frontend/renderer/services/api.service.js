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
                `${API_BASE}/events/range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
            );
            const data = await response.json();
            return data.events || [];
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
                method: 'PUT',
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
            return await response.json();
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
};
