// Day Modal Component - View

export const dayModalView = {
    show(date, events) {
        const modal = document.getElementById('dayModal');
        const content = document.getElementById('dayModalContent');
        
        if (!modal || !content) return;

        const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });

        const dayOfWeek = new Date(date).toLocaleDateString('ru-RU', { weekday: 'long' });
        const dayNumber = new Date(date).getDate();
        const monthYear = new Date(date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

        let eventsHTML = '';
        if (events && events.length > 0) {
            eventsHTML = `
                <div class="day-events-list">
                    <h4>События:</h4>
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
        } else {
            eventsHTML = '<p class="no-events">Нет событий на этот день</p>';
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
                ${eventsHTML}
            </div>
            <div class="day-modal-footer">
                <button class="btn" onclick="document.getElementById('dayModal').classList.remove('show')">Закрыть</button>
                <button class="btn btn-primary" onclick="document.getElementById('newEventBtn').click(); document.getElementById('dayModal').classList.remove('show')">+ Добавить событие</button>
            </div>
        `;

        modal.classList.add('show');
    },

    hide() {
        const modal = document.getElementById('dayModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
};
