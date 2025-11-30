import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateEventRequestDto {
  @ApiProperty({
    example: 'Встреча с командой',
    description: 'Название события',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'Обсуждение нового проекта Calendar App',
    description: 'Описание события',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2025-12-01T10:00:00.000Z',
    description: 'Дата и время начала события (ISO 8601)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-12-01T11:00:00.000Z',
    description: 'Дата и время окончания события (ISO 8601)',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    example: false,
    description: 'Событие на весь день',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  allDay?: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID категории',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
