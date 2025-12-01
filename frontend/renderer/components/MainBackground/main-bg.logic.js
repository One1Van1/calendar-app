// Логика фона основного календаря

export class MainBackgroundLogic {
    constructor() {
        this.isLoading = false;
    }

    // Установить состояние загрузки
    setLoading(loading) {
        this.isLoading = loading;
    }

    // Проверить, идёт ли загрузка
    isLoadingState() {
        return this.isLoading;
    }

    // Получить текущее состояние
    getState() {
        return {
            isLoading: this.isLoading
        };
    }
}
