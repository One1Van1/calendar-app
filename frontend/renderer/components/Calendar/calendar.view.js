// Calendar Component - View (использует детализированные компоненты)

import { CalendarDayLogic } from '../CalendarDay/day.logic.js';
import { CalendarDayView } from '../CalendarDay/day.view.js';
import { CalendarGridLogic } from '../CalendarGrid/grid.logic.js';
import { CalendarGridView } from '../CalendarGrid/grid.view.js';

export const calendarView = {
    gridLogic: new CalendarGridLogic(),

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
    }
};
