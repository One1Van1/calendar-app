// Type Selection Modal Component - View

export const typeSelectionView = {
    show() {
        const modal = document.getElementById('typeSelectionModal');
        modal.style.display = 'block';
    },

    hide() {
        const modal = document.getElementById('typeSelectionModal');
        modal.style.display = 'none';
    },

    getHTML() {
        return `
            <div id="typeSelectionModal" class="modal">
                <div class="modal-content type-selection-content">
                    <span class="close type-selection-close">&times;</span>
                    <h2>Что создать?</h2>
                    <div class="type-selection-buttons">
                        <button class="type-btn" data-type="event">
                            <span class="type-icon">📅</span>
                            <span class="type-name">Событие</span>
                        </button>
                        <button class="type-btn" data-type="task">
                            <span class="type-icon">✓</span>
                            <span class="type-name">Задача</span>
                        </button>
                        <button class="type-btn" data-type="reminder">
                            <span class="type-icon">🔔</span>
                            <span class="type-name">Напоминание</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
