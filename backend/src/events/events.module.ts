import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Category } from '../entities/category.entity';
import { Reminder } from '../entities/reminder.entity';

// GET controllers
import { GetAllEventsController } from '../features/events/GET/get-all/get-all.controller';

// GET services
import { GetAllEventsService } from '../features/events/GET/get-all/get-all.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Category, Reminder])],
  controllers: [GetAllEventsController],
  providers: [GetAllEventsService],
})
export class EventsModule {}
