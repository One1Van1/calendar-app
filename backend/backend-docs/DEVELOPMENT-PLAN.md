# 🗓️ Calendar Backend - План разработки

## 🎯 Цель
Создать локальное desktop приложение-календарь с:
- Просмотром событий по месяцам
- Созданием/редактированием событий
- Категориями для организации
- Напоминаниями
- Локальным хранением данных (SQLite)

---

## 📋 Этапы разработки

### ✅ Этап 1: Базовая настройка проекта
**Статус:** 🟢 В процессе

#### 1.1 Инфраструктура
- [x] Создать структуру папок
- [x] Настроить NestJS + TypeScript + Yarn
- [x] Создать документацию архитектуры
- [ ] Настроить TypeORM + SQLite
- [ ] Настроить переменные окружения (.env)
- [ ] Настроить Swagger документацию

#### 1.2 Базовая конфигурация
```typescript
// Нужно создать:
- src/config/database.config.ts      # Конфигурация SQLite
- src/config/app.config.ts           # Общая конфигурация
- .env файл с настройками
```

---

### 📦 Этап 2: Создание Entities (Иммутабельные!)

#### 2.1 Event Entity
```typescript
// src/entities/event.entity.ts
@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  allDay: boolean;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;

  @OneToMany(() => Reminder, reminder => reminder.event)
  reminders: Reminder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

#### 2.2 Category Entity
```typescript
// src/entities/category.entity.ts
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 7 }) // #RRGGBB
  color: string;

  @OneToMany(() => Event, event => event.category)
  events: Event[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
```

#### 2.3 Reminder Entity
```typescript
// src/entities/reminder.entity.ts
@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'event_id' })
  eventId: number;

  @Column({ type: 'datetime', name: 'reminder_time' })
  reminderTime: Date;

  @Column({ type: 'boolean', default: false, name: 'is_sent' })
  isSent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
```

**Задачи:**
- [ ] Создать `event.entity.ts`
- [ ] Создать `category.entity.ts`
- [ ] Создать `reminder.entity.ts`
- [ ] Проверить миграции БД

---

### 🔧 Этап 3: Shared компоненты

#### 3.1 Enums
```typescript
// src/shared/enums/event.enum.ts
export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  PAST = 'past',
}

export enum EventRepeatType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
```

```typescript
// src/shared/enums/reminder.enum.ts
export enum ReminderType {
  NOTIFICATION = 'notification',
  EMAIL = 'email',
}

export enum ReminderOffset {
  AT_TIME = 0,
  FIVE_MIN = 5,
  FIFTEEN_MIN = 15,
  THIRTY_MIN = 30,
  ONE_HOUR = 60,
  ONE_DAY = 1440,
}
```

#### 3.2 DTOs
```typescript
// src/shared/dto/formatted-response.dto.ts
export class FormattedResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T;

  @ApiProperty({ required: false })
  message?: string;

  constructor(data: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}
```

#### 3.3 Repositories
```typescript
// src/shared/repositories/event.repository.ts
@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return this.repository.find({
      where: {
        startDate: Between(startDate, endDate),
      },
      relations: ['category', 'reminders'],
    });
  }

  // Другие общие методы...
}
```

**Задачи:**
- [ ] Создать enums (event, reminder)
- [ ] Создать `formatted-response.dto.ts`
- [ ] Создать repositories (event, category, reminder)
- [ ] Создать базовые декораторы

---

### 🎯 Этап 4: Events Feature (API для событий)

#### 4.1 GET Endpoints

**GET /events** - Получить все события с пагинацией
```
features/events/GET/get-all/
├── get-all.controller.ts
├── get-all.service.ts
├── get-all.query.dto.ts
├── get-all.response.dto.ts
├── get-all.spec.ts
└── openapi.decorator.ts
```

**GET /events/:id** - Получить событие по ID
```
features/events/GET/get-by-id/
├── get-by-id.controller.ts
├── get-by-id.service.ts
├── get-by-id.params.dto.ts
├── get-by-id.response.dto.ts
├── get-by-id.spec.ts
└── openapi.decorator.ts
```

**GET /events/range** - Получить события за период (месяц)
```
features/events/GET/get-by-range/
├── get-by-range.controller.ts
├── get-by-range.service.ts
├── get-by-range.query.dto.ts
├── get-by-range.response.dto.ts
├── get-by-range.spec.ts
└── openapi.decorator.ts
```

#### 4.2 POST Endpoints

**POST /events** - Создать событие
```
features/events/POST/create-event/
├── create-event.controller.ts
├── create-event.service.ts
├── create-event.request.dto.ts
├── create-event.response.dto.ts
├── create-event.spec.ts
└── openapi.decorator.ts
```

#### 4.3 PUT Endpoints

**PUT /events/:id** - Обновить событие
```
features/events/PUT/update-event/
├── update-event.controller.ts
├── update-event.service.ts
├── update-event.params.dto.ts
├── update-event.request.dto.ts
├── update-event.response.dto.ts
├── update-event.spec.ts
└── openapi.decorator.ts
```

#### 4.4 DELETE Endpoints

**DELETE /events/:id** - Удалить событие
```
features/events/DELETE/delete-event/
├── delete-event.controller.ts
├── delete-event.service.ts
├── delete-event.params.dto.ts
├── delete-event.response.dto.ts
├── delete-event.spec.ts
└── openapi.decorator.ts
```

**Задачи:**
- [ ] Создать GET /events (get-all)
- [ ] Создать GET /events/:id (get-by-id)
- [ ] Создать GET /events/range (get-by-range)
- [ ] Создать POST /events (create-event)
- [ ] Создать PUT /events/:id (update-event)
- [ ] Создать DELETE /events/:id (delete-event)
- [ ] Написать E2E тесты для всех endpoints

---

### 🏷️ Этап 5: Categories Feature (API для категорий)

#### 5.1 GET Endpoints

**GET /categories** - Получить все категории
```
features/categories/GET/get-all/
```

**GET /categories/:id** - Получить категорию по ID
```
features/categories/GET/get-by-id/
```

#### 5.2 POST Endpoints

**POST /categories** - Создать категорию
```
features/categories/POST/create-category/
```

#### 5.3 PUT Endpoints

**PUT /categories/:id** - Обновить категорию
```
features/categories/PUT/update-category/
```

#### 5.4 DELETE Endpoints

**DELETE /categories/:id** - Удалить категорию
```
features/categories/DELETE/delete-category/
```

**Задачи:**
- [ ] Создать GET /categories (get-all)
- [ ] Создать GET /categories/:id (get-by-id)
- [ ] Создать POST /categories (create-category)
- [ ] Создать PUT /categories/:id (update-category)
- [ ] Создать DELETE /categories/:id (delete-category)
- [ ] Написать E2E тесты

---

### ⏰ Этап 6: Reminders Feature (API для напоминаний)

#### 6.1 GET Endpoints

**GET /reminders** - Получить все напоминания
```
features/reminders/GET/get-all/
```

**GET /reminders/event/:eventId** - Получить напоминания для события
```
features/reminders/GET/get-by-event/
```

**GET /reminders/pending** - Получить предстоящие напоминания
```
features/reminders/GET/get-pending/
```

#### 6.2 POST Endpoints

**POST /reminders** - Создать напоминание
```
features/reminders/POST/create-reminder/
```

#### 6.3 DELETE Endpoints

**DELETE /reminders/:id** - Удалить напоминание
```
features/reminders/DELETE/delete-reminder/
```

**Задачи:**
- [ ] Создать GET /reminders (get-all)
- [ ] Создать GET /reminders/event/:eventId (get-by-event)
- [ ] Создать GET /reminders/pending (get-pending)
- [ ] Создать POST /reminders (create-reminder)
- [ ] Создать DELETE /reminders/:id (delete-reminder)
- [ ] Написать E2E тесты

---

### 📦 Этап 7: Modules (Агрегация)

#### 7.1 Events Module
```typescript
// src/modules/events.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Event, Category, Reminder])],
  controllers: [
    GetAllEventsController,
    GetByIdEventController,
    GetByRangeEventsController,
    CreateEventController,
    UpdateEventController,
    DeleteEventController,
  ],
  providers: [
    GetAllEventsService,
    GetByIdEventService,
    GetByRangeEventsService,
    CreateEventService,
    UpdateEventService,
    DeleteEventService,
    EventRepository,
  ],
  exports: [EventRepository],
})
export class EventsModule {}
```

#### 7.2 Categories Module
```typescript
// src/modules/categories.module.ts
```

#### 7.3 Reminders Module
```typescript
// src/modules/reminders.module.ts
```

**Задачи:**
- [ ] Создать `events.module.ts`
- [ ] Создать `categories.module.ts`
- [ ] Создать `reminders.module.ts`
- [ ] Интегрировать в `app.module.ts`

---

### 🧪 Этап 8: Тестирование

#### 8.1 Unit тесты
- [ ] Тесты для сервисов
- [ ] Тесты для repositories

#### 8.2 E2E тесты
- [ ] Тесты для Events API
- [ ] Тесты для Categories API
- [ ] Тесты для Reminders API

#### 8.3 Integration тесты
- [ ] Тестирование связей между сущностями
- [ ] Тестирование каскадного удаления

---

### 📚 Этап 9: Документация

- [ ] Swagger UI настроен и работает
- [ ] API Reference полный
- [ ] Примеры запросов/ответов
- [ ] Postman коллекция (опционально)

---

### 🚀 Этап 10: Оптимизация и Production Ready

#### 10.1 Производительность
- [ ] Индексы в БД (startDate, endDate, categoryId)
- [ ] Пагинация оптимизирована
- [ ] Кэширование (если нужно)

#### 10.2 Безопасность
- [ ] Валидация всех входных данных
- [ ] Санитизация данных
- [ ] Rate limiting (опционально)

#### 10.3 Логирование
- [ ] Winston или Pino
- [ ] Логи ошибок
- [ ] Логи запросов (опционально)

---

## 🎯 Приоритеты разработки

### MVP (Минимально жизнеспособный продукт)
1. ✅ Базовая настройка + Entities
2. ✅ Events API (все endpoints)
3. ✅ Categories API (базовые CRUD)
4. ✅ Базовая интеграция с Frontend (Electron)

### Расширенная версия
5. ⏰ Reminders API
6. 📊 Статистика и аналитика
7. 🔄 Повторяющиеся события
8. 📤 Экспорт/импорт данных

---

## 📊 Прогресс

```
┌────────────────────────────────────────────────┐
│         DEVELOPMENT PROGRESS                   │
├────────────────────────────────────────────────┤
│  Этап 1: Настройка          [██████░░░░] 60%   │
│  Этап 2: Entities           [░░░░░░░░░░]  0%   │
│  Этап 3: Shared             [░░░░░░░░░░]  0%   │
│  Этап 4: Events API         [░░░░░░░░░░]  0%   │
│  Этап 5: Categories API     [░░░░░░░░░░]  0%   │
│  Этап 6: Reminders API      [░░░░░░░░░░]  0%   │
│  Этап 7: Modules            [░░░░░░░░░░]  0%   │
│  Этап 8: Тестирование       [░░░░░░░░░░]  0%   │
│  Этап 9: Документация       [░░░░░░░░░░]  0%   │
│  Этап 10: Production        [░░░░░░░░░░]  0%   │
├────────────────────────────────────────────────┤
│  ОБЩИЙ ПРОГРЕСС:            [██░░░░░░░░] 15%   │
└────────────────────────────────────────────────┘
```

---

## 🚀 Следующие шаги

**Сейчас нужно:**
1. ✅ Настроить TypeORM + SQLite
2. ✅ Создать три Entity (Event, Category, Reminder)
3. ✅ Создать shared компоненты (enums, DTOs, repositories)
4. ✅ Создать первый endpoint: GET /events

**Начинаем с этапа 1.1: Настройка TypeORM + SQLite**

---

**Обновлено:** 30 ноября 2025 г.  
**Версия:** 1.0  
**Статус:** 🟢 Active Development
