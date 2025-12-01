// Логика сетки календаря

export class CalendarGridLogic {
    constructor() {
        this.weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    }

    // Получить названия дней недели
    getWeekdays() {
        return this.weekdays;
    }

    // Изменить названия дней недели (например, для другого языка)
    setWeekdays(newWeekdays) {
        if (newWeekdays.length === 7) {
            this.weekdays = newWeekdays;
        }
    }

    // Логика для определения количества строк в сетке
    calculateGridRows(daysCount) {
        return Math.ceil(daysCount / 7);
    }

    // Проверка, нужна ли дополнительная строка
    needsExtraRow(firstDayWeek, daysInMonth) {
        return (firstDayWeek + daysInMonth) > 35;
    }
}
