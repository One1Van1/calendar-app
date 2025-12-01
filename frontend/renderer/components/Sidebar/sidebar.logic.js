// Sidebar Component - Logic

import { apiService } from '../../services/api.service.js';
import { sidebarView } from './sidebar.view.js';

export class SidebarComponent {
    constructor() {
        this.categories = [];
    }

    async initialize() {
        await this.loadCategories();
        this.setupEventListeners();
    }

    async loadCategories() {
        this.categories = await apiService.fetchCategories();
        this.render();
    }

    render() {
        sidebarView.renderCategories(this.categories);
    }

    setupEventListeners() {
        const addCategoryBtn = document.getElementById('addCategoryBtn');
        addCategoryBtn?.addEventListener('click', () => this.handleAddCategory());
    }

    handleAddCategory() {
        // TODO: Implement add category modal
        console.log('Add category clicked');
    }

    getCategoryColor(categoryId) {
        if (!categoryId) return '#999';
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.color : '#999';
    }

    getCategoriesForSelect() {
        return this.categories;
    }
}
