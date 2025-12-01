// Отображение фона основного календаря

export const MainBackgroundView = {
    // Настройки внешнего вида основной области
    styles: {
        // Фон
        backgroundColor: '#10476e',              // Цвет фона основной области
        
        // Отступы
        padding: '1rem',                         // Внутренний отступ
        
        // Прокрутка
        overflowY: 'auto',                      // Вертикальная прокрутка
        
        // Размеры
        flex: '1',                              // Занимает всё доступное пространство
    },

    // Применить стили к основной области
    applyStyles(element) {
        if (!element) return;

        element.style.background = this.styles.backgroundColor;
        element.style.padding = this.styles.padding;
        element.style.overflowY = this.styles.overflowY;
        element.style.flex = this.styles.flex;
    },

    // Получить инлайн-стили как строку
    getInlineStyles() {
        return `
            background: ${this.styles.backgroundColor};
            padding: ${this.styles.padding};
            overflow-y: ${this.styles.overflowY};
            flex: ${this.styles.flex};
        `;
    }
};
