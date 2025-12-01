// Отображение сетки календаря

export const CalendarGridView = {
    // Настройки внешнего вида сетки
    styles: {
        // Фон сетки
        backgroundColor: '#5b7a9b',              // Цвет фона всей сетки
        borderRadius: '8px',                     // Скругление углов
        padding: '1rem',                         // Внутренний отступ
        
        // Заголовки дней недели
        weekdayColor: '#ffffff',                 // Цвет текста дней недели
        weekdayFontSize: '0.85rem',             // Размер шрифта
        weekdayFontWeight: '600',               // Жирность шрифта
        weekdayPadding: '0.5rem',               // Отступ
        weekdayTextAlign: 'center',             // Выравнивание
        
        // Сетка дней
        gridGap: '0.5rem',                      // Расстояние между днями
        
        // Минимальная высота
        minHeight: '500px',
    },

    // Рендер заголовков дней недели
    renderWeekdays(weekdays) {
        return `
            <div style="
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: ${this.styles.gridGap};
                margin-bottom: ${this.styles.gridGap};
            ">
                ${weekdays.map(day => `
                    <div style="
                        text-align: ${this.styles.weekdayTextAlign};
                        font-weight: ${this.styles.weekdayFontWeight};
                        font-size: ${this.styles.weekdayFontSize};
                        color: ${this.styles.weekdayColor};
                        padding: ${this.styles.weekdayPadding};
                    ">
                        ${day}
                    </div>
                `).join('')}
            </div>
        `;
    },

    // Рендер контейнера для дней
    renderDaysContainer(daysHTML) {
        return `
            <div style="
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: ${this.styles.gridGap};
            ">
                ${daysHTML}
            </div>
        `;
    },

    // Рендер всей сетки
    render(weekdays, daysHTML) {
        return `
            <div style="
                background: ${this.styles.backgroundColor};
                border-radius: ${this.styles.borderRadius};
                padding: ${this.styles.padding};
                min-height: ${this.styles.minHeight};
            ">
                ${this.renderWeekdays(weekdays)}
                ${this.renderDaysContainer(daysHTML)}
            </div>
        `;
    }
};
