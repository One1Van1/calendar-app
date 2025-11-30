# Архитектура приложения

## Общая схема

```
┌─────────────────────────────────────────┐
│         Electron Main Process           │
│  - Управление окнами                    │
│  - Системные уведомления                │
│  - IPC коммуникация                     │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│      Electron Renderer Process          │
│  - UI (HTML/CSS/JS или React)           │
│  - Календарный интерфейс                │
│  - HTTP клиент для API                  │
└─────────────┬───────────────────────────┘
              │
              ↓ HTTP (localhost:3000)
┌─────────────────────────────────────────┐
│          NestJS Backend API             │
│  - REST API endpoints                   │
│  - Бизнес-логика                        │
│  - Валидация данных                     │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│        SQLite Database (local)          │
│  - events                               │
│  - categories                           │
│  - reminders                            │
└─────────────────────────────────────────┘
```

## Компоненты системы

### 1. Electron (Desktop Layer)
**Ответственность:**
- Создание нативного десктопного приложения
- Управление окном приложения
- Интеграция с операционной системой (Dock, уведомления)
- Обеспечение безопасной связи между процессами

**Технологии:**
- Electron
- electron-builder (для сборки)

### 2. Frontend (Presentation Layer)
**Ответственность:**
- Отображение календаря и событий
- Обработка пользовательского ввода
- Взаимодействие с Backend API
- Управление состоянием UI

**Технологии:**
- HTML5/CSS3/TypeScript
- (Опционально) React или Vue.js
- Axios или Fetch API для HTTP запросов

**Основные компоненты:**
```
components/
├── Calendar/
│   ├── CalendarGrid.tsx       # Сетка календаря
│   ├── CalendarHeader.tsx     # Навигация по месяцам
│   └── CalendarDay.tsx        # Отдельный день
├── Events/
│   ├── EventList.tsx          # Список событий
│   ├── EventCard.tsx          # Карточка события
│   ├── EventModal.tsx         # Модалка создания/редактирования
│   └── EventDetails.tsx       # Детали события
├── Categories/
│   ├── CategoryList.tsx       # Список категорий
│   └── CategoryPicker.tsx     # Выбор категории
└── Common/
    ├── Button.tsx
    ├── Input.tsx
    └── Modal.tsx
```

### 3. Backend (Business Logic Layer)
**Ответственность:**
- Обработка бизнес-логики
- Валидация данных
- CRUD операции с БД
- API endpoints

**Технологии:**
- NestJS
- TypeORM
- class-validator
- class-transformer

**Структура модулей:**
```
src/
├── app.module.ts
├── main.ts
├── events/
│   ├── events.module.ts
│   ├── events.controller.ts
│   ├── events.service.ts
│   ├── entities/
│   │   └── event.entity.ts
│   └── dto/
│       ├── create-event.dto.ts
│       └── update-event.dto.ts
├── categories/
│   ├── categories.module.ts
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── entities/
│       └── category.entity.ts
└── reminders/
    ├── reminders.module.ts
    ├── reminders.controller.ts
    ├── reminders.service.ts
    └── entities/
        └── reminder.entity.ts
```

### 4. Database (Data Layer)
**Ответственность:**
- Хранение данных событий
- Хранение категорий
- Хранение напоминаний

**Технология:**
- SQLite (локальная файловая БД)

**Схема БД:**
```sql
-- Events
CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    all_day BOOLEAN DEFAULT 0,
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Categories
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reminders
CREATE TABLE reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    reminder_time DATETIME NOT NULL,
    is_sent BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
```

## Потоки данных

### Создание события
```
1. Пользователь заполняет форму в UI
2. Frontend валидирует данные
3. Отправка POST /events
4. NestJS валидирует DTO
5. Service сохраняет в БД через TypeORM
6. Возврат созданного события
7. Frontend обновляет календарь
```

### Получение событий за месяц
```
1. Пользователь выбирает месяц
2. Frontend отправляет GET /events/range?start=&end=
3. Service запрашивает данные из БД
4. Возврат массива событий
5. Frontend отображает события в календаре
```

### Отправка напоминания
```
1. Electron Main Process запускает таймер
2. Проверка БД на активные напоминания
3. При совпадении времени - системное уведомление
4. Обновление статуса напоминания (is_sent = true)
```

## Безопасность

### IPC Communication
- Использовать contextBridge для безопасного API
- Не экспонировать Node.js API напрямую в renderer
- Валидировать все IPC сообщения

### API Security
- Локальный backend (localhost:3000)
- Опционально: токены для аутентификации между Electron и NestJS
- CORS настроен только для localhost

### Data Security
- Локальное хранение БД в безопасной директории
- Опционально: шифрование БД файла

## Производительность

### Оптимизация
- Lazy loading для событий (загрузка только текущего месяца)
- Кэширование на frontend (React Query или простой in-memory cache)
- Индексы в БД на полях start_date, end_date, category_id
- Пагинация для списка событий

### Мониторинг
- Логирование ошибок backend
- Error boundaries в frontend (если React)
