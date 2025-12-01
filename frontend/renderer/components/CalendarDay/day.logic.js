// Логика дня календаря

export class CalendarDayLogic {
    constructor(dayData) {
        this.day = dayData.day;
        this.isCurrentMonth = dayData.isCurrentMonth;
        this.isToday = dayData.isToday;
        this.date = dayData.date;
        this.events = dayData.events;
    }

    // Проверяет, есть ли события в этот день
    hasEvents() {
        return this.events && this.events.length > 0;
    }

    // Возвращает количество событий
    getEventsCount() {
        return this.events ? this.events.length : 0;
    }

    // Возвращает первые N событий для отображения
    getVisibleEvents(maxCount = 3) {
        if (!this.events) return [];
        return this.events.slice(0, maxCount);
    }

    // Возвращает количество скрытых событий
    getHiddenEventsCount(maxVisible = 3) {
        const total = this.getEventsCount();
        return total > maxVisible ? total - maxVisible : 0;
    }

    // Проверяет, нужно ли показывать счётчик "+N"
    shouldShowMoreIndicator(maxVisible = 3) {
        return this.getEventsCount() > maxVisible;
    }

    // Получить CSS классы для дня
    getCSSClasses() {
        const classes = ['calendar-day'];
        
        if (!this.isCurrentMonth) {
            classes.push('other-month');
        }
        
        if (this.isToday) {
            classes.push('today');
        }

        if (this.hasEvents()) {
            classes.push('has-events');
        }

        return classes;
    }

    // Обработчик клика на день
    handleClick(callback) {
        if (callback) {
            callback(this.date, this.events);
        }
    }
}
