// Отображение дня календаря

export const CalendarDayView = {
    // Настройки внешнего вида
    styles: {
        // Цвета
        backgroundColor: 'rgba(255, 255, 255, 0.08)',     // Полупрозрачный фон дня
        backgroundColorHover: 'rgba(255, 255, 255, 0.18)', // Фон при наведении
        borderColor: 'rgba(255, 255, 255, 0.15)',         // Видимый контур
        borderColorHover: 'rgba(255, 255, 255, 0.3)',     // Контур при наведении
        
        // Сегодняшний день
        todayBackgroundColor: 'rgba(52, 152, 219, 0.25)', // Полупрозрачный синий
        todayBorderColor: 'rgba(52, 152, 219, 0.6)',      // Синий контур
        
        // Другие месяцы
        otherMonthOpacity: '0.3',                // Прозрачность дней других месяцев
        
        // Текст
        textColor: '#ffffff',                    // Цвет текста
        numberFontSize: '1rem',                  // Размер числа
        numberFontWeight: '500',                 // Жирность числа
        
        // События
        eventDotSize: '6px',                     // Размер точки события
        eventDotMargin: '2px',                   // Отступ между точками
        
        // Анимация
        transitionDuration: '0.2s',              // Длительность анимации
        hoverScale: '1.02',                      // Увеличение при наведении
        
        // Размеры
        borderRadius: '6px',                     // Скругление углов
        padding: '0.5rem',                       // Внутренний отступ
    },

    // Рендер дня календаря
    render(dayLogic, getCategoryColor) {
        const classes = dayLogic.getCSSClasses();
        const visibleEvents = dayLogic.getVisibleEvents(3);
        const hiddenCount = dayLogic.getHiddenEventsCount(3);

        return `
            <div 
                class="${classes.join(' ')}" 
                data-date="${dayLogic.date.toISOString()}"
                style="
                    background: ${this.styles.backgroundColor};
                    border: 1px solid ${this.styles.borderColor};
                    border-radius: ${this.styles.borderRadius};
                    padding: ${this.styles.padding};
                    cursor: pointer;
                    transition: all ${this.styles.transitionDuration};
                    position: relative;
                    ${dayLogic.isToday ? `
                        background: ${this.styles.todayBackgroundColor} !important;
                        border-color: ${this.styles.todayBorderColor} !important;
                    ` : ''}
                    ${!dayLogic.isCurrentMonth ? `
                        opacity: ${this.styles.otherMonthOpacity};
                    ` : ''}
                "
                onmouseover="this.style.background='${this.styles.backgroundColorHover}'; this.style.borderColor='${this.styles.borderColorHover}'; this.style.transform='scale(${this.styles.hoverScale})';"
                onmouseout="this.style.background='${dayLogic.isToday ? this.styles.todayBackgroundColor : this.styles.backgroundColor}'; this.style.borderColor='${dayLogic.isToday ? this.styles.todayBorderColor : this.styles.borderColor}'; this.style.transform='scale(1)';"
            >
                <div style="
                    font-weight: ${this.styles.numberFontWeight};
                    font-size: ${this.styles.numberFontSize};
                    color: ${this.styles.textColor};
                    margin-bottom: 0.25rem;
                ">
                    ${dayLogic.day}
                </div>
                ${dayLogic.hasEvents() ? `
                    <div style="display: flex; align-items: center; gap: 2px; flex-wrap: wrap;">
                        ${visibleEvents.map(event => `
                            <div style="
                                width: ${this.styles.eventDotSize};
                                height: ${this.styles.eventDotSize};
                                border-radius: 50%;
                                background: ${getCategoryColor(event.categoryId)};
                                display: inline-block;
                                margin-right: ${this.styles.eventDotMargin};
                            "></div>
                        `).join('')}
                        ${hiddenCount > 0 ? `
                            <span style="
                                font-size: 0.7rem;
                                color: ${this.styles.textColor};
                                margin-left: 2px;
                            ">+${hiddenCount}</span>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }
};
