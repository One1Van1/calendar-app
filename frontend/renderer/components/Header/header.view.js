// Header Component - View

import { dateUtils } from '../../utils/date.utils.js';

export const headerView = {
    updateMonthDisplay(date) {
        const currentMonthSpan = document.getElementById('currentMonth');
        if (currentMonthSpan) {
            currentMonthSpan.textContent = dateUtils.formatMonthYear(date);
        }
    }
};
