// Отображение элемента категории

export const CategoryItemView = {
    // Настройки внешнего вида элемента категории
    styles: {
        // Фон
        backgroundColor: 'transparent',          // Фон по умолчанию
        backgroundColorHover: 'rgba(255, 255, 255, 0.15)',  // Фон при наведении
        backgroundColorActive: 'rgba(255, 255, 255, 0.2)',  // Фон активного элемента
        
        // Отступы
        padding: '0.5rem',                       // Внутренний отступ
        gap: '0.5rem',                          // Расстояние между элементами
        
        // Граница
        borderRadius: '6px',                     // Скругление углов
        
        // Цветной индикатор
        colorIndicatorSize: '12px',              // Размер цветного кружка
        colorIndicatorBorderRadius: '50%',       // Форма (круг)
        
        // Текст
        textColor: '#ffffff',                    // Цвет текста
        fontSize: '0.9rem',                      // Размер шрифта
        
        // Анимация
        transition: 'all 0.2s ease',            // Плавный переход
        
        // Курсор
        cursor: 'pointer',
    },

    // Рендер элемента категории
    render(categoryLogic) {
        const classes = categoryLogic.getCSSClasses();
        const isActive = categoryLogic.isActiveState();

        return `
            <div 
                class="${classes.join(' ')}" 
                data-id="${categoryLogic.getId()}"
                style="
                    display: flex;
                    align-items: center;
                    gap: ${this.styles.gap};
                    padding: ${this.styles.padding};
                    border-radius: ${this.styles.borderRadius};
                    cursor: ${this.styles.cursor};
                    transition: ${this.styles.transition};
                    background: ${isActive ? this.styles.backgroundColorActive : this.styles.backgroundColor};
                "
                onmouseover="this.style.background='${this.styles.backgroundColorHover}';"
                onmouseout="this.style.background='${isActive ? this.styles.backgroundColorActive : this.styles.backgroundColor}';"
            >
                <span style="
                    width: ${this.styles.colorIndicatorSize};
                    height: ${this.styles.colorIndicatorSize};
                    border-radius: ${this.styles.colorIndicatorBorderRadius};
                    background: ${categoryLogic.getColor()};
                    display: inline-block;
                    flex-shrink: 0;
                "></span>
                <span style="
                    color: ${this.styles.textColor};
                    font-size: ${this.styles.fontSize};
                ">
                    ${categoryLogic.getName()}
                </span>
            </div>
        `;
    }
};
