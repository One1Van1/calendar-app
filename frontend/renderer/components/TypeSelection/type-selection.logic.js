// Type Selection Modal Component - Logic

import { typeSelectionView } from './type-selection.view.js';

export class TypeSelectionComponent {
    constructor(onTypeSelected) {
        this.onTypeSelected = onTypeSelected;
        this.isOpen = false;
    }

    initialize() {
        // Добавляем HTML в DOM
        const container = document.createElement('div');
        container.innerHTML = typeSelectionView.getHTML();
        document.body.appendChild(container.firstElementChild);

        this.setupEventListeners();
    }

    setupEventListeners() {
        const modal = document.getElementById('typeSelectionModal');
        const closeBtn = modal.querySelector('.type-selection-close');
        const typeButtons = modal.querySelectorAll('.type-btn');

        closeBtn?.addEventListener('click', () => this.hide());

        typeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                this.handleTypeSelection(type);
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hide();
            }
        });
    }

    show() {
        this.isOpen = true;
        typeSelectionView.show();
    }

    hide() {
        this.isOpen = false;
        typeSelectionView.hide();
    }

    handleTypeSelection(type) {
        this.hide();
        if (this.onTypeSelected) {
            this.onTypeSelected(type);
        }
    }
}
