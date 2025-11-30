import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Category } from '../entities/category.entity';
import { Reminder } from '../entities/reminder.entity';

// GET controllers
import { GetAllEventsController } from '../features/events/GET/get-all/get-all.controller';
import { GetByIdEventController } from '../features/events/GET/get-by-id/get-by-id.controller';

// POST controllers
import { CreateEventController } from '../features/events/POST/create-event/create-event.controller';

// PUT controllers
import { UpdateEventController } from '../features/events/PUT/update-event/update-event.controller';

// DELETE controllers
import { DeleteEventController } from '../features/events/DELETE/delete-event/delete-event.controller';

// GET services
import { GetAllEventsService } from '../features/events/GET/get-all/get-all.service';
import { GetByIdEventService } from '../features/events/GET/get-by-id/get-by-id.service';

// POST services
import { CreateEventService } from '../features/events/POST/create-event/create-event.service';

// PUT services
import { UpdateEventService } from '../features/events/PUT/update-event/update-event.service';

// DELETE services
import { DeleteEventService } from '../features/events/DELETE/delete-event/delete-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Category, Reminder])],
  controllers: [
    GetAllEventsController,
    GetByIdEventController,
    CreateEventController,
    UpdateEventController,
    DeleteEventController,
  ],
  providers: [
    GetAllEventsService,
    GetByIdEventService,
    CreateEventService,
    UpdateEventService,
    DeleteEventService,
  ],
})
export class EventsModule {}
