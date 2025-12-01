import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleDayEvent } from '../entities/single-day-event.entity';
import { Category } from '../entities/category.entity';

// Controllers
import { CreateSingleDayEventController } from '../features/single-day-events/POST/create/create.controller';
import { GetByDateController } from '../features/single-day-events/GET/get-by-date/get-by-date.controller';
import { UpdateChecklistController } from '../features/single-day-events/PUT/update-checklist/update-checklist.controller';

// Services
import { CreateSingleDayEventService } from '../features/single-day-events/POST/create/create.service';
import { GetByDateService } from '../features/single-day-events/GET/get-by-date/get-by-date.service';
import { UpdateChecklistService } from '../features/single-day-events/PUT/update-checklist/update-checklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([SingleDayEvent, Category])],
  controllers: [
    CreateSingleDayEventController,
    GetByDateController,
    UpdateChecklistController,
  ],
  providers: [
    CreateSingleDayEventService,
    GetByDateService,
    UpdateChecklistService,
  ],
})
export class SingleDayEventsModule {}
