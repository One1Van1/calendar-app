import { ApiProperty } from '@nestjs/swagger';
import { Reminder } from '../../../../entities/reminder.entity';

class PendingReminderItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  eventId: number;

  @ApiProperty({ example: 'Встреча с командой' })
  eventTitle: string;

  @ApiProperty({ example: '2025-12-01T09:45:00.000Z' })
  reminderTime: Date;

  @ApiProperty()
  createdAt: Date;

  constructor(reminder: Reminder) {
    this.id = reminder.id;
    this.eventId = reminder.eventId;
    this.eventTitle = reminder.event?.title || '';
    this.reminderTime = reminder.reminderTime;
    this.createdAt = reminder.createdAt;
  }
}

export class GetPendingRemindersResponseDto {
  @ApiProperty({
    type: [PendingReminderItemDto],
    description: 'Список предстоящих напоминаний (неотправленных)',
  })
  reminders: PendingReminderItemDto[];

  @ApiProperty({
    example: 5,
    description: 'Количество предстоящих напоминаний',
  })
  total: number;

  constructor(reminders: Reminder[]) {
    this.reminders = reminders.map((reminder) => new PendingReminderItemDto(reminder));
    this.total = reminders.length;
  }
}
