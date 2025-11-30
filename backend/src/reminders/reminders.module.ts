import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from '../entities/reminder.entity';
import { Event } from '../entities/event.entity';

// GET controllers
import { GetAllRemindersController } from '../features/reminders/GET/get-all/get-all.controller';
import { GetByEventRemindersController } from '../features/reminders/GET/get-by-event/get-by-event.controller';
import { GetPendingRemindersController } from '../features/reminders/GET/get-pending/get-pending.controller';

// POST controllers
import { CreateReminderController } from '../features/reminders/POST/create-reminder/create-reminder.controller';

// DELETE controllers
import { DeleteReminderController } from '../features/reminders/DELETE/delete-reminder/delete-reminder.controller';

// GET services
import { GetAllRemindersService } from '../features/reminders/GET/get-all/get-all.service';
import { GetByEventRemindersService } from '../features/reminders/GET/get-by-event/get-by-event.service';
import { GetPendingRemindersService } from '../features/reminders/GET/get-pending/get-pending.service';

// POST services
import { CreateReminderService } from '../features/reminders/POST/create-reminder/create-reminder.service';

// DELETE services
import { DeleteReminderService } from '../features/reminders/DELETE/delete-reminder/delete-reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder, Event])],
  controllers: [
    GetAllRemindersController,
    GetByEventRemindersController,
    GetPendingRemindersController,
    CreateReminderController,
    DeleteReminderController,
  ],
  providers: [
    GetAllRemindersService,
    GetByEventRemindersService,
    GetPendingRemindersService,
    CreateReminderService,
    DeleteReminderService,
  ],
})
export class RemindersModule {}
