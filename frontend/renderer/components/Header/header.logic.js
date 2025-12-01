// Header Component - Logic

import { themeUtils } from '../../utils/theme.utils.js';
import { headerView } from './header.view.js';

export class HeaderComponent {
    constructor(onNavigate) {
        this.onNavigate = onNavigate;
        this.currentDate = new Date();
    }

    initialize() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const prevMonthBtn = document.getElementById('prevMonthBtn');
        const nextMonthBtn = document.getElementById('nextMonthBtn');
        const todayBtn = document.getElementById('todayBtn');

        prevMonthBtn?.addEventListener('click', () => this.handlePrevMonth());
        nextMonthBtn?.addEventListener('click', () => this.handleNextMonth());
        todayBtn?.addEventListener('click', () => this.handleToday());
    }

    handlePrevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.onNavigate(this.currentDate);
    }

    handleNextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.onNavigate(this.currentDate);
    }

    handleToday() {
        this.currentDate = new Date();
        this.onNavigate(this.currentDate);
    }

    updateMonthDisplay(date) {
        this.currentDate = date;
        headerView.updateMonthDisplay(date);
    }
}
