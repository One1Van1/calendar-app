import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateReminderDto {
  @ApiProperty({
    example: 'Купить продукты',
    description: 'Название напоминания',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Молоко, хлеб, яйца',
    description: 'Описание напоминания',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2025-12-01',
    description: 'Дата напоминания (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '14:30:00',
    description: 'Время напоминания (HH:MM:SS)',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'time must be in format HH:MM:SS',
  })
  time: string;
}
