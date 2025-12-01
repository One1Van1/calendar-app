// Логика элемента категории

export class CategoryItemLogic {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
        this.color = category.color;
        this.isActive = false;
    }

    // Получить ID категории
    getId() {
        return this.id;
    }

    // Получить имя категории
    getName() {
        return this.name;
    }

    // Получить цвет категории
    getColor() {
        return this.color;
    }

    // Установить активность (выбрана ли категория для фильтра)
    setActive(active) {
        this.isActive = active;
    }

    // Проверить, активна ли категория
    isActiveState() {
        return this.isActive;
    }

    // Переключить активность
    toggleActive() {
        this.isActive = !this.isActive;
        return this.isActive;
    }

    // Получить CSS классы
    getCSSClasses() {
        const classes = ['category-item'];
        if (this.isActive) {
            classes.push('active');
        }
        return classes;
    }

    // Обработчик клика
    handleClick(callback) {
        if (callback) {
            callback(this.id, this.name, this.color);
        }
    }
}
