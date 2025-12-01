// Логика фона боковой панели

export class SidebarBackgroundLogic {
    constructor() {
        this.isCollapsed = false;
    }

    // Свернуть/развернуть боковую панель
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        return this.isCollapsed;
    }

    // Получить текущее состояние
    getState() {
        return {
            isCollapsed: this.isCollapsed
        };
    }

    // Установить состояние
    setState(collapsed) {
        this.isCollapsed = collapsed;
    }
}
