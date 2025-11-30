import { ApiProperty } from '@nestjs/swagger';
import { Reminder } from '../../../../entities/reminder.entity';

class ReminderItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  eventId: number;

  @ApiProperty({ example: '2025-12-01T09:45:00.000Z' })
  reminderTime: Date;

  @ApiProperty({ example: false })
  isSent: boolean;

  @ApiProperty()
  createdAt: Date;

  constructor(reminder: Reminder) {
    this.id = reminder.id;
    this.eventId = reminder.eventId;
    this.reminderTime = reminder.reminderTime;
    this.isSent = reminder.isSent;
    this.createdAt = reminder.createdAt;
  }
}

export class GetAllRemindersResponseDto {
  @ApiProperty({
    type: [ReminderItemDto],
    description: 'Список напоминаний',
  })
  data: ReminderItemDto[];

  @ApiProperty({
    example: 20,
    description: 'Общее количество напоминаний',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Текущая страница',
  })
  page: number;

  @ApiProperty({
    example: 50,
    description: 'Количество напоминаний на странице',
  })
  limit: number;

  @ApiProperty({
    example: 1,
    description: 'Всего страниц',
  })
  totalPages: number;

  constructor(reminders: Reminder[], total: number, page: number, limit: number) {
    this.data = reminders.map((reminder) => new ReminderItemDto(reminder));
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
