// Day Modal Component - View

export const dayModalView = {
    show(date, events, singleDayEvents, modalComponent) {
        const modal = document.getElementById('dayModal');
        const content = document.getElementById('dayModalContent');
        
        if (!modal || !content) return;

        const dayOfWeek = new Date(date).toLocaleDateString('ru-RU', { weekday: 'long' });
        const dayNumber = new Date(date).getDate();
        const monthYear = new Date(date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

        let contentHTML = '';

        // Single-day события с чек-листами и прогресс-барами
        if (singleDayEvents && singleDayEvents.length > 0) {
            contentHTML += `
                <div class="single-day-events-section">
                    <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase;">Задачи дня</h4>
                    ${singleDayEvents.map(event => `
                        <div class="single-day-event-card" style="
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 8px;
                            padding: 1rem;
                            margin-bottom: 1rem;
                            border-left: 3px solid #3498db;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: 1rem; margin-bottom: 0.25rem;">
                                        ${event.name}
                                    </div>
                                    ${event.startTime ? `
                                        <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                            ${event.startTime.substring(0, 5)} - ${event.endTime ? event.endTime.substring(0, 5) : ''}
                                        </div>
                                    ` : ''}
                                </div>
                                ${event.progress !== null && event.progress !== undefined ? `
                                    <div style="
                                        background: linear-gradient(135deg, #3498db, #2ecc71);
                                        color: white;
                                        padding: 0.25rem 0.75rem;
                                        border-radius: 12px;
                                        font-size: 0.85rem;
                                        font-weight: 600;
                                    ">
                                        ${event.progress}%
                                    </div>
                                ` : ''}
                            </div>
                            
                            ${event.description ? `
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.75rem;">
                                    ${event.description}
                                </div>
                            ` : ''}
                            
                            ${event.checklist && event.checklist.length > 0 ? `
                                <div class="checklist" style="margin-top: 0.75rem;">
                                    ${event.checklist.map(item => `
                                        <div class="checklist-item" style="
                                            display: flex;
                                            align-items: center;
                                            padding: 0.5rem;
                                            background: rgba(255, 255, 255, 0.03);
                                            border-radius: 4px;
                                            margin-bottom: 0.5rem;
                                            cursor: pointer;
                                            transition: background 0.2s;
                                        " 
                                        onmouseover="this.style.background='rgba(255, 255, 255, 0.08)'"
                                        onmouseout="this.style.background='rgba(255, 255, 255, 0.03)'"
                                        onclick="event.preventDefault(); window.dayModalComponent.toggleChecklistItem(${event.id}, '${item.id}'); return false;">
                                            <input 
                                                type="checkbox" 
                                                ${item.completed ? 'checked' : ''} 
                                                style="
                                                    width: 18px;
                                                    height: 18px;
                                                    margin-right: 0.75rem;
                                                    cursor: pointer;
                                                    accent-color: #2ecc71;
                                                "
                                                onclick="event.stopPropagation();"
                                                onchange="event.stopPropagation(); event.preventDefault(); window.dayModalComponent.toggleChecklistItem(${event.id}, '${item.id}'); return false;"
                                            />
                                            <span style="
                                                color: var(--text-primary);
                                                font-size: 0.9rem;
                                                ${item.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}
                                            ">
                                                ${item.text}
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                ${event.progress !== null && event.progress !== undefined ? `
                                    <div style="margin-top: 0.75rem;">
                                        <div style="
                                            width: 100%;
                                            height: 6px;
                                            background: rgba(255, 255, 255, 0.1);
                                            border-radius: 3px;
                                            overflow: hidden;
                                        ">
                                            <div style="
                                                width: ${event.progress}%;
                                                height: 100%;
                                                background: linear-gradient(to right, #3498db, #2ecc71);
                                                transition: width 0.3s ease;
                                            "></div>
                                        </div>
                                    </div>
                                ` : ''}
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Старые события (из таблицы events)
        if (events && events.length > 0) {
            contentHTML += `
                <div class="old-events-section" style="margin-top: ${singleDayEvents?.length ? '1.5rem' : '0'};">
                    <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase;">События</h4>
                    ${events.map(event => `
                        <div class="day-event-item">
                            <div class="event-time">
                                ${new Date(event.startDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div class="event-details">
                                <div class="event-title">${event.title}</div>
                                ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Если нет событий вообще
        if ((!singleDayEvents || singleDayEvents.length === 0) && (!events || events.length === 0)) {
            contentHTML = '<p class="no-events">Нет событий на этот день</p>';
        }

        content.innerHTML = `
            <div class="day-modal-header">
                <div class="day-modal-date">
                    <div class="day-number">${dayNumber}</div>
                    <div class="day-info">
                        <div class="day-weekday">${dayOfWeek}</div>
                        <div class="day-month-year">${monthYear}</div>
                    </div>
                </div>
            </div>
            <div class="day-modal-body">
                ${contentHTML}
            </div>
            <div class="day-modal-footer">
                <button class="btn" onclick="document.getElementById('dayModal').classList.remove('show')">Закрыть</button>
                <button class="btn btn-primary" onclick="document.getElementById('newEventBtn').click(); document.getElementById('dayModal').classList.remove('show')">+ Добавить событие</button>
            </div>
        `;

        // Сохраняем ссылку на компонент для обработчиков
        window.dayModalComponent = modalComponent;

        modal.classList.add('show');
    },

    hide() {
        const modal = document.getElementById('dayModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
};
