// Calendar Component - Logic

import { apiService } from '../../services/api.service.js';
import { dateUtils } from '../../utils/date.utils.js';
import { calendarView } from './calendar.view.js';

export class CalendarComponent {
    constructor(sidebarComponent, dayModalComponent) {
        this.currentDate = new Date();
        this.events = [];
        this.tasks = [];
        this.reminders = [];
        this.sidebarComponent = sidebarComponent;
        this.dayModalComponent = dayModalComponent;
    }

    async initialize() {
        // Устанавливаем обработчик двойного клика
        calendarView.onDayDoubleClick = (date, events) => {
            this.handleDayDoubleClick(date, events);
        };
        
        await this.render();
    }

    handleDayDoubleClick(date, events) {
        if (this.dayModalComponent) {
            this.dayModalComponent.open(date, events);
        }
    }

    async render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        try {
            // Load events, tasks, and reminders for current month
            const [events, tasks, reminders] = await Promise.all([
                apiService.fetchEventsForMonth(year, month),
                apiService.fetchTasksForMonth(year, month),
                apiService.fetchRemindersForMonth(year, month)
            ]);

            this.events = Array.isArray(events) ? events : [];
            this.tasks = Array.isArray(tasks) ? tasks : [];
            this.reminders = Array.isArray(reminders) ? reminders : [];

            // Build calendar data
            const calendarData = this.buildCalendarData(year, month);

            // Render view
            calendarView.render(calendarData, this.events, this.sidebarComponent);
        } catch (error) {
            console.error('Error rendering calendar:', error);
            // Показываем пустой календарь при ошибке
            const calendarData = this.buildCalendarData(year, month);
            calendarView.render(calendarData, [], this.sidebarComponent);
        }
    }

    buildCalendarData(year, month) {
        const firstDayWeek = dateUtils.getWeekdayOfFirstDay(year, month);
        const daysInMonth = dateUtils.getDaysInMonth(year, month);
        const prevMonthDays = dateUtils.getDaysInMonth(year, month - 1);

        const days = [];

        // Previous month days
        for (let i = firstDayWeek - 2; i >= 0; i--) {
            const day = prevMonthDays - i;
            days.push({
                day,
                isCurrentMonth: false,
                isToday: false,
                date: new Date(year, month - 1, day),
                events: [],
            });
        }

        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = dateUtils.isToday(date);
            const dayEvents = this.getEventsForDay(date);

            days.push({
                day,
                isCurrentMonth: true,
                isToday,
                date,
                events: dayEvents,
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isToday: false,
                isToday: false,
                date: new Date(year, month + 1, day),
                events: [],
            });
        }

        return { days, year, month };
    }

    getEventsForDay(date) {
        return this.events.filter(e => {
            const eventDate = new Date(e.date);
            return dateUtils.isSameDay(eventDate, date);
        });
    }
    updateDate(newDate) {
        this.currentDate = newDate;
        this.render();
    }
}
