// Date utility functions

export const dateUtils = {
    formatDateTimeLocal(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    },

    formatMonthYear(date) {
        return date.toLocaleDateString('ru-RU', { 
            month: 'long', 
            year: 'numeric' 
        });
    },

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    },

    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    },

    getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    },

    getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    },

    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    },

    getWeekdayOfFirstDay(year, month) {
        const firstDay = new Date(year, month, 1);
        return firstDay.getDay() || 7; // Monday = 1
    }
};
