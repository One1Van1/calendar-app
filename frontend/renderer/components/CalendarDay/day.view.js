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
                    cursor: pointer;
                    transition: all ${this.styles.transitionDuration};
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                    overflow: hidden;
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
                <!-- Верхняя часть с датой (25-30%) -->
                <div class="calendar-day-header" style="
                    flex: 0 0 28%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                ">
                    <div style="
                        font-weight: ${this.styles.numberFontWeight};
                        font-size: ${this.styles.numberFontSize};
                        color: ${this.styles.textColor};
                    ">
                        ${dayLogic.day}
                    </div>
                </div>
                
                <!-- Нижняя часть с событиями (70-75%) -->
                <div class="calendar-day-body" style="
                    flex: 1;
                    padding: 0.5rem;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                ">
                    ${dayLogic.singleDayEvents && dayLogic.singleDayEvents.length > 0 ? `
                        ${dayLogic.singleDayEvents.slice(0, 2).map(event => `
                            <div class="single-day-event-item" style="
                                display: flex;
                                flex-direction: column;
                                padding: 0.25rem;
                                background: rgba(255, 255, 255, 0.1);
                                border-radius: 3px;
                                font-size: 0.7rem;
                            ">
                                <div style="
                                    color: ${this.styles.textColor};
                                    font-weight: 600;
                                    margin-bottom: 0.15rem;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                ">
                                    ${event.startTime ? event.startTime.substring(0, 5) + ' ' : ''}${event.name}
                                </div>
                                ${event.progress !== null && event.progress !== undefined ? `
                                    <div style="
                                        width: 100%;
                                        height: 3px;
                                        background: rgba(255, 255, 255, 0.2);
                                        border-radius: 2px;
                                        overflow: hidden;
                                    ">
                                        <div style="
                                            width: ${event.progress}%;
                                            height: 100%;
                                            background: linear-gradient(to right, #3498db, #2ecc71);
                                            transition: width 0.3s ease;
                                        "></div>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                        ${dayLogic.singleDayEvents.length > 2 ? `
                            <div style="
                                font-size: 0.65rem;
                                color: ${this.styles.textColor};
                                opacity: 0.7;
                                text-align: center;
                            ">
                                +${dayLogic.singleDayEvents.length - 2} ещё
                            </div>
                        ` : ''}
                    ` : `
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
                    `}
                </div>
            </div>
        `;
    }
};
