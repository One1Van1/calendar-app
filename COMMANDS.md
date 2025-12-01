# Calendar App - Команды запуска

## Установка зависимостей

```bash
# Установить все зависимости (backend + frontend)
yarn install-all

# Или установить отдельно:
cd backend && yarn install
cd frontend && yarn install
```

## Запуск приложения

### Вариант 1: Запустить всё вместе (рекомендуется)
```bash
# Из корневой директории
yarn start
```
Это запустит backend на порту 3000 и frontend (Electron)

### Вариант 2: Запустить по отдельности

**Терминал 1 - Backend:**
```bash
yarn backend
# или
cd backend && yarn start:dev
```
Backend запустится на http://localhost:3000

**Терминал 2 - Frontend:**
```bash
yarn frontend
# или
cd frontend && yarn start
```
Frontend запустит Electron приложение

## Порты

- **Backend (NestJS)**: `http://localhost:3000`
- **Swagger API Docs**: `http://localhost:3000/api/docs`
- **Frontend (Electron)**: Десктопное приложение (не использует отдельный порт)

## API Endpoints

- `POST /events` - Создать событие
- `POST /tasks` - Создать задачу
- `POST /reminders` - Создать напоминание
- `GET /events`, `/tasks`, `/reminders` - Получить список
- `PATCH /events/:id`, `/tasks/:id`, `/reminders/:id` - Обновить
- `DELETE /events/:id`, `/tasks/:id`, `/reminders/:id` - Удалить

## Решение проблем

### Порт 3000 занят
```bash
# Найти и убить процесс на порту 3000
lsof -ti:3000 | xargs kill -9
```

### Ошибки TypeScript
```bash
cd frontend && yarn build
```
