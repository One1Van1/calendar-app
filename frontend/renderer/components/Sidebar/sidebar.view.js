// Sidebar Component - View (использует детализированные компоненты)

import { CategoryItemLogic } from '../CategoryItem/category.logic.js';
import { CategoryItemView } from '../CategoryItem/category.view.js';

export const sidebarView = {
    renderCategories(categories) {
        const categoriesList = document.getElementById('categoriesList');
        if (!categoriesList) return;

        // Рендер каждой категории через детализированный компонент
        categoriesList.innerHTML = categories.map(cat => {
            const categoryLogic = new CategoryItemLogic(cat);
            return CategoryItemView.render(categoryLogic);
        }).join('');
    }
};
