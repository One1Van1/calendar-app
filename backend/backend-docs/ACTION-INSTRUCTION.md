# 📘 Calendar API - AI-Agent Development Guide

## 🚩 Цель

Разработка Calendar API следует строгим архитектурным принципам:

- **Иммутабельность**: НИКОГДА не редактируем существующий код, entities, endpoints
- **Атомарность**: Каждая feature = одно API действие (endpoint) = одна папка
- **Согласованность**: Переиспользуем существующие стабильные entities без изменений
- **Изолированность**: Каждая feature полностью самодостаточна

---

## 📦 Структура проекта

```
backend/src/
  features/               # Изолированные API actions
    events/
      GET/
        get-all/         # GET /events
        get-by-id/       # GET /events/:id
        get-by-range/    # GET /events/range
      POST/
        create-event/    # POST /events
      PUT/
        update-event/    # PUT /events/:id
      DELETE/
        delete-event/    # DELETE /events/:id
    categories/
      GET/
        get-all/         # GET /categories
      POST/
        create-category/ # POST /categories
    reminders/
      GET/
        get-all/         # GET /reminders
      POST/
        create-reminder/ # POST /reminders
  
  modules/                # Агрегирующие модули
    events.module.ts
    categories.module.ts
    reminders.module.ts
  
  entities/               # Стабильные, иммутабельные entities
    event.entity.ts
    category.entity.ts
    reminder.entity.ts
  
  shared/                 # Общие utils, interceptors, decorators
    dto/
      formatted-response.dto.ts
    repositories/
    enums/
```

---

## ⚠️ Критические правила

### 1. Иммутабельные Entities
- ❌ **НИКОГДА** не редактируйте `event.entity.ts`, `category.entity.ts` и другие entity файлы
- 🆘 Если нужны новые поля - запрос к архитектору, НЕ добавляйте сами

### 2. Изоляция Features
- ✅ **КАЖДЫЙ** endpoint ДОЛЖЕН иметь свою изолированную директорию
- ❌ **НИКОГДА** не импортируйте код/DTOs из других feature директорий
- ✅ Общая логика через стабильные сервисы (repositories)

### 3. Запрет на редактирование
- ❌ **НИКОГДА** не редактируйте существующие endpoints/actions
- ✅ **ТОЛЬКО** добавляйте новые feature actions

---

## 🧩 Структура Feature Action

Каждая изолированная action строго следует структуре:

```
get-all/
  ├── get-all.controller.ts      # Контроллер
  ├── get-all.service.ts          # Бизнес-логика
  ├── get-all.query.dto.ts        # Query параметры
  ├── get-all.response.dto.ts     # Response DTO
  ├── get-all.spec.ts             # E2E тесты
  └── openapi.decorator.ts        # Swagger документация
```

---

## 📌 Детальные инструкции по файлам

### ✅ controller.ts

**Строгие требования типизации:**
- Метод контроллера ДОЛЖЕН иметь явный тип возврата, совпадающий с response DTO
- Все параметры ДОЛЖНЫ быть типизированы с validation pipes
- Все DTOs ДОЛЖНЫ использоваться для типизации request/response

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllEventsService } from './get-all.service';
import { GetAllEventsQueryDto } from './get-all.query.dto';
import { GetAllEventsResponseDto } from './get-all.response.dto';
import { ApiGetAllEvents } from './openapi.decorator';

@Controller('events')
@ApiTags('GetAllEvents')
export class GetAllEventsController {
  constructor(private readonly service: GetAllEventsService) {}

  @Get()
  @ApiGetAllEvents()
  async handle(
    @Query() query: GetAllEventsQueryDto
  ): Promise<GetAllEventsResponseDto> {
    return this.service.execute(query);
  }
}
```

**Обязательные паттерны типизации:**

GET с query параметрами:
```typescript
async handle(@Query() query: QueryDto): Promise<ResponseDto>
```

GET с path параметрами:
```typescript
async handle(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto>
```

POST endpoint:
```typescript
async handle(@Body() createDto: CreateDto): Promise<ResponseDto>
```

PUT/PATCH endpoint:
```typescript
async handle(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateDto: UpdateDto
): Promise<ResponseDto>
```

DELETE endpoint:
```typescript
async handle(@Param('id', ParseIntPipe) id: number): Promise<DeleteResponseDto>
```

**Важно:**
- ✅ Простые маршруты: `@Get()`, `@Post()`, `@Put(':id')`
- ❌ НИКОГДА не переиспользуйте контроллеры для нескольких endpoints
- ✅ ВСЕГДА добавляйте `@ApiTags` с именем feature
- ✅ **ОБЯЗАТЕЛЬНО:** Явная типизация всех параметров и возвращаемых значений
- ✅ **ОБЯЗАТЕЛЬНО:** `ParseIntPipe` для всех числовых path параметров

---

### ✅ service.ts

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../entities/event.entity';
import { GetAllEventsQueryDto } from './get-all.query.dto';
import { GetAllEventsResponseDto } from './get-all.response.dto';

@Injectable()
export class GetAllEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(query: GetAllEventsQueryDto): Promise<GetAllEventsResponseDto> {
    const { limit = 10, page = 1, categoryId } = query;
    
    const [items, total] = await this.eventRepository.findAndCount({
      where: categoryId ? { categoryId } : {},
      take: limit,
      skip: (page - 1) * limit,
      relations: ['category'],
    });

    return new GetAllEventsResponseDto(items, total);
  }
}
```

**Важно:**
- ✅ Один сервис = одно публичное действие `execute()`
- ✅ Можно инжектить стабильные сервисы/репозитории
- ❌ НИКОГДА не импортируйте сервисы из других actions

---

### ✅ DTOs (query.dto.ts, response.dto.ts)

**Обработка ENUM - обязательные требования:**
- ВСЕ enum поля ДОЛЖНЫ использовать явные enum в декораторе `@ApiProperty`
- Импортируйте enums из `shared/enums/` и используйте в валидации
- ВСЕГДА указывайте `enum`, `enumName` и `example` для правильной генерации frontend

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { EventStatus } from '../../../shared/enums/event.enum';

export class GetAllEventsQueryDto {
  @ApiProperty({ 
    enum: EventStatus, 
    enumName: 'EventStatus',
    example: EventStatus.UPCOMING,
    description: 'Фильтр по статусу события',
    required: false
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiProperty({ 
    example: 10, 
    description: 'Количество элементов на странице',
    required: false,
    default: 10
  })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({ 
    example: 1, 
    description: 'Номер страницы',
    required: false,
    default: 1
  })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ 
    example: 1, 
    description: 'ID категории для фильтрации',
    required: false
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class GetAllEventsResponseDto {
  @ApiProperty({ 
    type: [Event],
    description: 'Список событий'
  })
  items: Event[];

  @ApiProperty({ 
    example: 100,
    description: 'Общее количество'
  })
  total: number;

  constructor(items: Event[], total: number) {
    this.items = items;
    this.total = total;
  }
}
```

**Обязательные паттерны для ENUM:**

Статус:
```typescript
@ApiProperty({ 
  enum: EventStatus, 
  enumName: 'EventStatus',
  example: EventStatus.UPCOMING,
  description: 'Статус события'
})
@IsEnum(EventStatus)
status: EventStatus;
```

**Важные правила enum:**
- ✅ ВСЕГДА используйте `enumName` для правильной генерации frontend
- ✅ ВСЕГДА указывайте `example` с реальным значением enum
- ✅ ВСЕГДА импортируйте enums из `shared/enums/`
- ❌ НИКОГДА не используйте массивы строк вместо enums
- ✅ ВСЕГДА используйте декоратор `@IsEnum()` с типом enum

---

### ✅ openapi.decorator.ts

```typescript
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { GetAllEventsResponseDto } from './get-all.response.dto';
import { EventStatus } from '../../../shared/enums/event.enum';

export const ApiGetAllEvents = () =>
  applyDecorators(
    ApiOperation({ summary: 'Получить все события с пагинацией' }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'categoryId', required: false, type: Number }),
    ApiQuery({ 
      name: 'status', 
      required: false, 
      enum: EventStatus,
      enumName: 'EventStatus'
    }),
    ApiOkResponse({ 
      type: GetAllEventsResponseDto,
      description: 'События успешно получены'
    }),
  );
```

**Важно:**
- ❌ НЕ добавляйте `ApiTags` здесь (только в контроллере)
- ✅ Четкое описание
- ✅ Указывайте все query параметры через `@ApiQuery`

---

### ✅ spec.ts (Тесты)

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsModule } from '../../../modules/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('GetAllEventsController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../../../entities/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        EventsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return paginated events', () => {
    return request(app.getHttpServer())
      .get('/events?limit=10&page=1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('items');
        expect(res.body).toHaveProperty('total');
        expect(Array.isArray(res.body.items)).toBe(true);
      });
  });

  it('should filter by category', () => {
    return request(app.getHttpServer())
      .get('/events?categoryId=1')
      .expect(200);
  });
});
```

---

## 🔐 Архитектурные границы (Критично!)

| Правило | Объяснение |
|---------|------------|
| Иммутабельные Entities | Никогда не добавляйте поля/связи в существующие entities |
| Изолированные Actions | Никогда не импортируйте сервисы/DTOs/контроллеры других actions |
| Атомарность | Одна action = один endpoint = одна папка |
| Стабильное ядро | Используйте ТОЛЬКО предоставленные стабильные entities и repositories |
| Изоляция DTO | Каждая action имеет свои уникальные DTOs |
| Без рефакторинга | НИКОГДА не изменяйте существующие файлы |

---

## 📚 Workflow добавления новой Action

1. ✅ Определите точный endpoint (GET, POST, PUT, DELETE)
2. ✅ Создайте НОВУЮ директорию action под `features/events/GET/` (или POST/PUT/DELETE)
3. ✅ Следуйте ТОЧНО структуре и naming convention
4. ✅ Напишите DTOs, Controller, Service, OpenAPI decorator, тесты в строгой изоляции
5. ✅ Добавьте `@ApiTags` в контроллер с именем feature
6. ✅ Запросите review у архитектора
7. ❌ НИКОГДА не трогайте другие существующие actions или entities

---

## ⚠️ Частые ошибки - НЕ ДЕЛАЙТЕ ТАК

- ❌ Импорт DTOs/сервисов из других action папок
- ❌ Изменение стабильных entities (`event.entity.ts`)
- ❌ Объединение нескольких endpoints в один контроллер
- ❌ Создание общих DTO файлов между actions
- ❌ Создание `index.ts` файлов
- ❌ Добавление `ApiTags` в `openapi.decorator.ts`
- ❌ Нетипизированные параметры или return types (ломает Swagger)
- ❌ Забыть `ParseIntPipe` для числовых path параметров
- ❌ Использовать generic return types типа `Promise<any>`
- ❌ Использовать массивы строк вместо proper enums в `@ApiProperty`
- ❌ Забыть `enumName` в `@ApiProperty` для enum полей
- ❌ Использовать hardcoded строки вместо enum констант

---

## ✅ Финальный чеклист

Перед отправкой работы убедитесь:

- ☑️ Action имеет свою изолированную папку
- ☑️ Controller имеет `@ApiTags` с именем feature и ровно один публичный метод
- ☑️ **Метод контроллера имеет явный return type, совпадающий с response DTO**
- ☑️ **Все параметры правильно типизированы с validation pipes**
- ☑️ **`ParseIntPipe` используется для всех числовых path параметров**
- ☑️ **Все enum поля используют proper `@ApiProperty` с `enumName` и `example`**
- ☑️ **Все enum поля имеют валидацию `@IsEnum()`**
- ☑️ Service имеет ровно один публичный метод
- ☑️ DTOs и Swagger decorators уникальны
- ☑️ Тесты проходят успешно для вашего endpoint
- ☑️ Нет импортов из других action директорий
- ☑️ Нет изменений в существующих entities или actions
- ☑️ Нет `index.ts` файлов

---

## 🚩 Резюме

**Всегда РАСШИРЯЙ. Никогда не ИЗМЕНЯЙ. Всегда ИЗОЛИРУЙ.**

🎉 **Готовы к работе!**
