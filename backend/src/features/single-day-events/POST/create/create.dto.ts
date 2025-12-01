import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsInt, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class ChecklistItemDto {
  @ApiProperty({ example: 'uuid-v4' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Подготовить документы' })
  @IsString()
  text: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  completed: boolean;
}

export class CreateSingleDayEventDto {
  @ApiProperty({ example: 'Встреча с клиентом', description: 'Название события' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Обсудить условия контракта', description: 'Описание события' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-12-01', description: 'День события (YYYY-MM-DD)' })
  @IsDateString()
  day: string;

  @ApiPropertyOptional({ example: '09:00', description: 'Время начала (HH:mm)' })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({ example: '10:00', description: 'Время окончания (HH:mm)' })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID категории' })
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({
    type: [ChecklistItemDto],
    description: 'Чек-лист задач',
    example: [
      { id: 'uuid-1', text: 'Подготовить документы', completed: false },
      { id: 'uuid-2', text: 'Забронировать переговорную', completed: true },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  checklist?: ChecklistItemDto[];
}
