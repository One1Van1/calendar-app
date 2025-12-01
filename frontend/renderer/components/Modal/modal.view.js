// Modal Component - View

export const modalView = {
    show(data) {
        const eventModal = document.getElementById('eventModal');
        const modalTitle = eventModal?.querySelector('h2');
        const startDateInput = document.getElementById('eventStartDate');
        const endDateInput = document.getElementById('eventEndDate');
        const categorySelect = document.getElementById('eventCategory');

        if (modalTitle) {
            modalTitle.textContent = data.title || 'Создать событие';
        }

        if (eventModal) {
            eventModal.classList.add('show');
        }

        if (startDateInput) {
            startDateInput.value = data.startDate;
        }

        if (endDateInput) {
            endDateInput.value = data.endDate;
        }

        // Для напоминаний скрываем поле "Конец"
        const endDateGroup = endDateInput?.closest('.form-group');
        if (endDateGroup) {
            if (data.type === 'reminder') {
                endDateGroup.style.display = 'none';
            } else {
                endDateGroup.style.display = 'block';
            }
        }

        if (categorySelect) {
            this.updateCategorySelect(data.categories);
        }
    },

    hide() {
        const eventModal = document.getElementById('eventModal');
        const eventForm = document.getElementById('eventForm');

        if (eventModal) {
            eventModal.classList.remove('show');
        }

        if (eventForm) {
            eventForm.reset();
        }
    },

    updateCategorySelect(categories) {
        const select = document.getElementById('eventCategory');
        if (!select) return;

        select.innerHTML = '<option value="">Без категории</option>' +
            categories.map(cat => `
                <option value="${cat.id}">${cat.name}</option>
            `).join('');
    },

    getFormData() {
        return {
            title: document.getElementById('eventTitle')?.value || '',
            description: document.getElementById('eventDescription')?.value || '',
            startDate: document.getElementById('eventStartDate')?.value || '',
            endDate: document.getElementById('eventEndDate')?.value || '',
            categoryId: document.getElementById('eventCategory')?.value || '',
            allDay: document.getElementById('eventAllDay')?.checked || false,
        };
    }
};
