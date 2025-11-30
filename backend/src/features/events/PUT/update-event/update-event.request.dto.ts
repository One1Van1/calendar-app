import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class UpdateEventRequestDto {
  @ApiProperty({
    example: 'Встреча с командой (обновлено)',
    description: 'Название события',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiProperty({
    example: 'Новое описание события',
    description: 'Описание события',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2025-12-01T11:00:00.000Z',
    description: 'Дата и время начала',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    example: '2025-12-01T12:00:00.000Z',
    description: 'Дата и время окончания',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    example: true,
    description: 'Событие на весь день',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  allDay?: boolean;

  @ApiProperty({
    example: 2,
    description: 'ID категории',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
