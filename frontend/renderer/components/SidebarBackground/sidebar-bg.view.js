// Отображение фона боковой панели

export const SidebarBackgroundView = {
    // Настройки внешнего вида боковой панели
    styles: {
        // Фон
        backgroundColor: '#10476e',              // Цвет фона боковой панели
        
        // Размеры
        width: '250px',                          // Ширина панели
        widthCollapsed: '60px',                  // Ширина в свёрнутом состоянии
        
        // Границы
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',  // Правая граница
        
        // Отступы
        padding: '1rem',                         // Внутренний отступ
        paddingCollapsed: '0.5rem',             // Отступ в свёрнутом состоянии
        
        // Анимация
        transition: 'all 0.3s ease',            // Плавный переход
        
        // Прокрутка
        overflowY: 'auto',                      // Вертикальная прокрутка
    },

    // Применить стили к боковой панели
    applyStyles(element, isCollapsed = false) {
        if (!element) return;

        element.style.background = this.styles.backgroundColor;
        element.style.width = isCollapsed ? this.styles.widthCollapsed : this.styles.width;
        element.style.borderRight = this.styles.borderRight;
        element.style.padding = isCollapsed ? this.styles.paddingCollapsed : this.styles.padding;
        element.style.transition = this.styles.transition;
        element.style.overflowY = this.styles.overflowY;
    },

    // Получить инлайн-стили как строку
    getInlineStyles(isCollapsed = false) {
        return `
            background: ${this.styles.backgroundColor};
            width: ${isCollapsed ? this.styles.widthCollapsed : this.styles.width};
            border-right: ${this.styles.borderRight};
            padding: ${isCollapsed ? this.styles.paddingCollapsed : this.styles.padding};
            transition: ${this.styles.transition};
            overflow-y: ${this.styles.overflowY};
        `;
    }
};
