import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString } from 'class-validator';

export class CreateReminderRequestDto {
  @ApiProperty({
    example: 1,
    description: 'ID события',
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    example: '2025-12-01T09:45:00.000Z',
    description: 'Время напоминания (ISO 8601)',
  })
  @IsDateString()
  reminderTime: string;
}
