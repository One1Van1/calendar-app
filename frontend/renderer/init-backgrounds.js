// Инициализация фоновых стилей для компонентов

import { SidebarBackgroundView } from './components/SidebarBackground/sidebar-bg.view.js';
import { MainBackgroundView } from './components/MainBackground/main-bg.view.js';

export function initializeBackgrounds() {
    // Применить стили к боковой панели
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        SidebarBackgroundView.applyStyles(sidebar);
    }

    // Применить стили к основной области
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        MainBackgroundView.applyStyles(mainContent);
    }
}
