import { ApiProperty } from '@nestjs/swagger';
import { Reminder } from '../../entities/reminder.entity';

export class ReminderResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Купить продукты' })
  name: string;

  @ApiProperty({ example: 'Молоко, хлеб, яйца', required: false })
  description?: string;

  @ApiProperty({ example: '2025-12-01' })
  date: string;

  @ApiProperty({ example: '14:30:00' })
  time: string;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  updatedAt: Date;

  constructor(reminder: Reminder) {
    this.id = reminder.id;
    this.name = reminder.name;
    this.description = reminder.description;
    this.date = reminder.date?.toISOString().split('T')[0];
    this.time = reminder.time;
    this.createdAt = reminder.createdAt;
    this.updatedAt = reminder.updatedAt;
  }
}
