import { ApiProperty } from '@nestjs/swagger';
import { Reminder } from '../../../../entities/reminder.entity';

export class CreateReminderResponseDto {
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
