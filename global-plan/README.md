# Локальный календарь (Desktop Application)

## Описание проекта
Десктопное приложение-календарь на базе Electron + NestJS + TypeScript, которое запускается локально и появляется в Dock macOS.

## Технологический стек
- **Backend**: NestJS (TypeScript)
- **Frontend**: HTML/CSS/JavaScript (или React)
- **Desktop**: Electron
- **База данных**: SQLite (локальная)
- **Язык**: TypeScript
- **Менеджер пакетов**: Yarn

## Основные функции
- Просмотр календаря по месяцам
- Создание, редактирование и удаление событий
- Напоминания о событиях
- Поиск по событиям
- Категории событий
- Локальное хранение данных

## Структура проекта
```
Calendar/
├── backend/          # NestJS API
└── backend-docs/          # NestJS API
├── frontend/         # Electron + UI
└── frontend-docs/          # NestJS API
├── docs/             # Документация
└── shared/           # Общие типы и утилиты
├── global-plan/      # Общий план на проект
```

## Требования
- Node.js >= 18
- Yarn >= 1.22.x
- macOS (для разработки и запуска)
