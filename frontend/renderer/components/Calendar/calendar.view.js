// Calendar Component - View (использует детализированные компоненты)

import { CalendarDayLogic } from '../CalendarDay/day.logic.js';
import { CalendarDayView } from '../CalendarDay/day.view.js';
import { CalendarGridLogic } from '../CalendarGrid/grid.logic.js';
import { CalendarGridView } from '../CalendarGrid/grid.view.js';

export const calendarView = {
    gridLogic: new CalendarGridLogic(),
    onDayDoubleClick: null,

    render(calendarData, events, sidebarComponent) {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const { days } = calendarData;

        // Рендер каждого дня через детализированный компонент
        const daysHTML = days.map(dayData => {
            const dayLogic = new CalendarDayLogic(dayData);
            return CalendarDayView.render(dayLogic, (catId) => sidebarComponent.getCategoryColor(catId));
        }).join('');

        // Рендер всей сетки через детализированный компонент
        const gridHTML = CalendarGridView.render(this.gridLogic.getWeekdays(), daysHTML);
        
        calendarGrid.innerHTML = gridHTML;

        // Добавляем обработчик двойного клика на дни
        this.attachDayClickHandlers(days);
    },

    attachDayClickHandlers(days) {
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach((element, index) => {
            element.addEventListener('dblclick', () => {
                if (this.onDayDoubleClick && days[index]) {
                    this.onDayDoubleClick(days[index].date, days[index].events);
                }
            });
        });
    }
};
