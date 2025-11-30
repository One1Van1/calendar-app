# API Документация

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Events

#### Получить все события
```http
GET /events
```

**Query Parameters:**
- `start` (optional): ISO 8601 date - начало периода
- `end` (optional): ISO 8601 date - конец периода
- `categoryId` (optional): number - фильтр по категории

**Response:**
```json
[
  {
    "id": 1,
    "title": "Встреча с командой",
    "description": "Обсуждение проекта",
    "startDate": "2025-11-30T10:00:00.000Z",
    "endDate": "2025-11-30T11:00:00.000Z",
    "allDay": false,
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Работа",
      "color": "#FF5733"
    },
    "createdAt": "2025-11-29T12:00:00.000Z",
    "updatedAt": "2025-11-29T12:00:00.000Z"
  }
]
```

#### Получить событие по ID
```http
GET /events/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Встреча с командой",
  "description": "Обсуждение проекта",
  "startDate": "2025-11-30T10:00:00.000Z",
  "endDate": "2025-11-30T11:00:00.000Z",
  "allDay": false,
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Работа",
    "color": "#FF5733"
  }
}
```

#### Создать событие
```http
POST /events
```

**Request Body:**
```json
{
  "title": "Встреча с командой",
  "description": "Обсуждение проекта",
  "startDate": "2025-11-30T10:00:00.000Z",
  "endDate": "2025-11-30T11:00:00.000Z",
  "allDay": false,
  "categoryId": 1
}
```

**Validation:**
- `title`: required, string, max 255 characters
- `description`: optional, string
- `startDate`: required, ISO 8601 date
- `endDate`: required, ISO 8601 date, must be after startDate
- `allDay`: optional, boolean, default false
- `categoryId`: optional, number

**Response:**
```json
{
  "id": 1,
  "title": "Встреча с командой",
  "description": "Обсуждение проекта",
  "startDate": "2025-11-30T10:00:00.000Z",
  "endDate": "2025-11-30T11:00:00.000Z",
  "allDay": false,
  "categoryId": 1,
  "createdAt": "2025-11-29T12:00:00.000Z",
  "updatedAt": "2025-11-29T12:00:00.000Z"
}
```

#### Обновить событие
```http
PUT /events/:id
```

**Request Body:** (все поля опциональны)
```json
{
  "title": "Встреча с командой (обновлено)",
  "description": "Новое описание",
  "startDate": "2025-11-30T11:00:00.000Z",
  "endDate": "2025-11-30T12:00:00.000Z",
  "categoryId": 2
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Встреча с командой (обновлено)",
  "description": "Новое описание",
  "startDate": "2025-11-30T11:00:00.000Z",
  "endDate": "2025-11-30T12:00:00.000Z",
  "allDay": false,
  "categoryId": 2,
  "updatedAt": "2025-11-29T13:00:00.000Z"
}
```

#### Удалить событие
```http
DELETE /events/:id
```

**Response:**
```json
{
  "message": "Event deleted successfully"
}
```

---

### Categories

#### Получить все категории
```http
GET /categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Работа",
    "color": "#FF5733",
    "createdAt": "2025-11-29T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Личное",
    "color": "#33FF57",
    "createdAt": "2025-11-29T12:00:00.000Z"
  }
]
```

#### Получить категорию по ID
```http
GET /categories/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Работа",
  "color": "#FF5733",
  "createdAt": "2025-11-29T12:00:00.000Z"
}
```

#### Создать категорию
```http
POST /categories
```

**Request Body:**
```json
{
  "name": "Работа",
  "color": "#FF5733"
}
```

**Validation:**
- `name`: required, string, max 100 characters
- `color`: required, string, hex color format (#RRGGBB)

**Response:**
```json
{
  "id": 1,
  "name": "Работа",
  "color": "#FF5733",
  "createdAt": "2025-11-29T12:00:00.000Z"
}
```

#### Обновить категорию
```http
PUT /categories/:id
```

**Request Body:**
```json
{
  "name": "Работа (обновлено)",
  "color": "#FF6633"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Работа (обновлено)",
  "color": "#FF6633",
  "createdAt": "2025-11-29T12:00:00.000Z"
}
```

#### Удалить категорию
```http
DELETE /categories/:id
```

**Response:**
```json
{
  "message": "Category deleted successfully"
}
```

---

### Reminders

#### Получить все напоминания
```http
GET /reminders
```

**Query Parameters:**
- `eventId` (optional): number - фильтр по событию
- `pending` (optional): boolean - только неотправленные

**Response:**
```json
[
  {
    "id": 1,
    "eventId": 1,
    "reminderTime": "2025-11-30T09:45:00.000Z",
    "isSent": false,
    "createdAt": "2025-11-29T12:00:00.000Z",
    "event": {
      "id": 1,
      "title": "Встреча с командой"
    }
  }
]
```

#### Получить напоминание по ID
```http
GET /reminders/:id
```

**Response:**
```json
{
  "id": 1,
  "eventId": 1,
  "reminderTime": "2025-11-30T09:45:00.000Z",
  "isSent": false,
  "event": {
    "id": 1,
    "title": "Встреча с командой"
  }
}
```

#### Создать напоминание
```http
POST /reminders
```

**Request Body:**
```json
{
  "eventId": 1,
  "reminderTime": "2025-11-30T09:45:00.000Z"
}
```

**Validation:**
- `eventId`: required, number, must exist
- `reminderTime`: required, ISO 8601 date, must be before event start

**Response:**
```json
{
  "id": 1,
  "eventId": 1,
  "reminderTime": "2025-11-30T09:45:00.000Z",
  "isSent": false,
  "createdAt": "2025-11-29T12:00:00.000Z"
}
```

#### Удалить напоминание
```http
DELETE /reminders/:id
```

**Response:**
```json
{
  "message": "Reminder deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["title should not be empty", "startDate must be a valid ISO 8601 date string"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Event with ID 123 not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## TypeScript Types

```typescript
// Event
interface Event {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  categoryId?: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

// Category
interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
}

// Reminder
interface Reminder {
  id: number;
  eventId: number;
  reminderTime: Date;
  isSent: boolean;
  event?: Event;
  createdAt: Date;
}

// DTOs
interface CreateEventDto {
  title: string;
  description?: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  allDay?: boolean;
  categoryId?: number;
}

interface UpdateEventDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  allDay?: boolean;
  categoryId?: number;
}

interface CreateCategoryDto {
  name: string;
  color: string; // #RRGGBB
}

interface CreateReminderDto {
  eventId: number;
  reminderTime: string; // ISO 8601
}
```
