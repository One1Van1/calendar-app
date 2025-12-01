// Calendar Component - Logic

import { apiService } from '../../services/api.service.js';
import { dateUtils } from '../../utils/date.utils.js';
import { calendarView } from './calendar.view.js';

export class CalendarComponent {
    constructor(sidebarComponent) {
        this.currentDate = new Date();
        this.events = [];
        this.sidebarComponent = sidebarComponent;
    }

    async initialize() {
        await this.render();
    }

    async render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Load events for current month
        this.events = await apiService.fetchEventsForMonth(year, month);

        // Build calendar data
        const calendarData = this.buildCalendarData(year, month);

        // Render view
        calendarView.render(calendarData, this.events, this.sidebarComponent);
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
                events: []
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
                events: dayEvents
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isToday: false,
                date: new Date(year, month + 1, day),
                events: []
            });
        }

        return { days, year, month };
    }

    getEventsForDay(date) {
        return this.events.filter(e => {
            const eventDate = new Date(e.startDate);
            return dateUtils.isSameDay(eventDate, date);
        });
    }

    updateDate(newDate) {
        this.currentDate = newDate;
        this.render();
    }
}
