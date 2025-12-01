// Day Modal Component - View

export const dayModalView = {
    show(date, events, tasks, reminders, modalComponent) {
        const modal = document.getElementById('dayModal');
        const content = document.getElementById('dayModalContent');
        
        if (!modal || !content) return;

        const dayOfWeek = new Date(date).toLocaleDateString('ru-RU', { weekday: 'long' });
        const dayNumber = new Date(date).getDate();
        const monthYear = new Date(date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

        let contentHTML = '';

        // Задачи с подзадачами и прогресс-барами
        if (tasks && tasks.length > 0) {
            contentHTML += `
                <div class="tasks-section">
                    <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase;">✓ Задачи</h4>
                    ${tasks.map(task => `
                        <div class="task-card" style="
                            background: rgba(46, 204, 113, 0.1);
                            border-radius: 8px;
                            padding: 1rem;
                            margin-bottom: 1rem;
                            border-left: 3px solid #2ecc71;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: 1rem; margin-bottom: 0.25rem;">
                                        ${task.name}
                                    </div>
                                    ${task.startTime ? `
                                        <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                            ${task.startTime.substring(0, 5)}${task.endTime ? ` - ${task.endTime.substring(0, 5)}` : ''}
                                        </div>
                                    ` : ''}
                                </div>
                                ${task.progress !== null && task.progress !== undefined ? `
                                    <div style="
                                        background: linear-gradient(135deg, #2ecc71, #27ae60);
                                        color: white;
                                        padding: 0.25rem 0.75rem;
                                        border-radius: 12px;
                                        font-size: 0.85rem;
                                        font-weight: 600;
                                    ">
                                        ${task.progress}%
                                    </div>
                                ` : ''}
                            </div>
                            
                            ${task.description ? `
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.75rem;">
                                    ${task.description}
                                </div>
                            ` : ''}
                            
                            ${task.subtasks && task.subtasks.length > 0 ? `
                                <div class="subtasks" style="margin-top: 0.75rem;">
                                    ${task.subtasks.map(subtask => `
                                        <div class="subtask-item" style="
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
                                        onclick="event.preventDefault(); window.dayModalComponent.toggleSubtask(${task.id}, ${subtask.id}); return false;">
                                            <input 
                                                type="checkbox" 
                                                ${subtask.completed ? 'checked' : ''} 
                                                style="
                                                    width: 18px;
                                                    height: 18px;
                                                    margin-right: 0.75rem;
                                                    cursor: pointer;
                                                    accent-color: #2ecc71;
                                                "
                                                onclick="event.stopPropagation();"
                                                onchange="event.stopPropagation(); event.preventDefault(); window.dayModalComponent.toggleSubtask(${task.id}, ${subtask.id}); return false;"
                                            />
                                            <span style="
                                                color: var(--text-primary);
                                                font-size: 0.9rem;
                                                ${subtask.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}
                                            ">
                                                ${subtask.text}
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                ${task.progress !== null && task.progress !== undefined ? `
                                    <div style="margin-top: 0.75rem;">
                                        <div style="
                                            width: 100%;
                                            height: 6px;
                                            background: rgba(255, 255, 255, 0.1);
                                            border-radius: 3px;
                                            overflow: hidden;
                                        ">
                                            <div style="
                                                width: ${task.progress}%;
                                                height: 100%;
                                                background: linear-gradient(to right, #2ecc71, #27ae60);
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

        // События
        if (events && events.length > 0) {
            contentHTML += `
                <div class="events-section" style="margin-top: ${tasks?.length ? '1.5rem' : '0'};">
                    <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase;">📅 События</h4>
                    ${events.map(event => `
                        <div class="event-card" style="
                            background: rgba(52, 152, 219, 0.1);
                            border-radius: 8px;
                            padding: 1rem;
                            margin-bottom: 1rem;
                            border-left: 3px solid #3498db;
                        ">
                            <div style="font-weight: 600; color: var(--text-primary); font-size: 1rem; margin-bottom: 0.25rem;">
                                ${event.name}
                            </div>
                            ${event.startTime ? `
                                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                                    ${event.startTime.substring(0, 5)}${event.endTime ? ` - ${event.endTime.substring(0, 5)}` : ''}
                                </div>
                            ` : ''}
                            ${event.description ? `
                                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                                    ${event.description}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Напоминания
        if (reminders && reminders.length > 0) {
            contentHTML += `
                <div class="reminders-section" style="margin-top: ${(tasks?.length || events?.length) ? '1.5rem' : '0'};">
                    <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; text-transform: uppercase;">🔔 Напоминания</h4>
                    ${reminders.map(reminder => `
                        <div class="reminder-card" style="
                            background: rgba(241, 196, 15, 0.1);
                            border-radius: 8px;
                            padding: 1rem;
                            margin-bottom: 1rem;
                            border-left: 3px solid #f1c40f;
                        ">
                            <div style="font-weight: 600; color: var(--text-primary); font-size: 1rem; margin-bottom: 0.25rem;">
                                ${reminder.name}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                                ${reminder.time.substring(0, 5)}
                            </div>
                            ${reminder.description ? `
                                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                                    ${reminder.description}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Если нет ничего
        if ((!tasks || tasks.length === 0) && (!events || events.length === 0) && (!reminders || reminders.length === 0)) {
            contentHTML = '<p class="no-events" style="text-align: center; color: var(--text-secondary); padding: 2rem;">Нет событий на этот день</p>';
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
                <button class="btn btn-primary" onclick="document.getElementById('newEventBtn').click(); document.getElementById('dayModal').classList.remove('show')">+ Добавить</button>
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
