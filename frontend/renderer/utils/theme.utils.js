// Theme utility functions - только тёмная тема

export const themeUtils = {
    getCurrentTheme() {
        return 'dark'; // Всегда тёмная
    },

    applyTheme(theme = 'dark') {
        // Тема всегда тёмная, но для совместимости оставляем функцию
        document.documentElement.removeAttribute('data-theme'); // Убираем атрибут, используем :root
        return 'dark';
    },

    toggleTheme() {
        // Больше не переключаем тему
        return 'dark';
    },

    getThemeIcon(theme) {
        return '🌙'; // Всегда тёмная
    }
};
