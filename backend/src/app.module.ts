import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [EventsModule, CategoriesModule, RemindersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
