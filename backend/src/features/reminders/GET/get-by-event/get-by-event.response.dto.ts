import { ApiProperty } from '@nestjs/swagger';
import { Reminder } from '../../../../entities/reminder.entity';

class ReminderItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-12-01T09:45:00.000Z' })
  reminderTime: Date;

  @ApiProperty({ example: false })
  isSent: boolean;

  @ApiProperty()
  createdAt: Date;

  constructor(reminder: Reminder) {
    this.id = reminder.id;
    this.reminderTime = reminder.reminderTime;
    this.isSent = reminder.isSent;
    this.createdAt = reminder.createdAt;
  }
}

export class GetByEventRemindersResponseDto {
  @ApiProperty({
    type: [ReminderItemDto],
    description: 'Список напоминаний для события',
  })
  reminders: ReminderItemDto[];

  @ApiProperty({
    example: 1,
    description: 'ID события',
  })
  eventId: number;

  @ApiProperty({
    example: 3,
    description: 'Количество напоминаний',
  })
  total: number;

  constructor(reminders: Reminder[], eventId: number) {
    this.reminders = reminders.map((reminder) => new ReminderItemDto(reminder));
    this.eventId = eventId;
    this.total = reminders.length;
  }
}
