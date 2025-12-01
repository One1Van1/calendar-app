import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  IsArray,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TaskSubtaskDto {
  @ApiProperty({
    example: 'Подготовить презентацию',
    description: 'Текст подзадачи',
  })
  @IsString()
  @MaxLength(500)
  text: string;

  @ApiProperty({
    example: false,
    description: 'Статус выполнения подзадачи',
    default: false,
  })
  @IsOptional()
  completed?: boolean;
}

export class CreateTaskDto {
  @ApiProperty({
    example: 'Завершить проект',
    description: 'Название задачи',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Закончить работу над Calendar App',
    description: 'Описание задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2025-12-01',
    description: 'Дата задачи (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '10:00:00',
    description: 'Время начала (HH:MM:SS)',
    required: false,
  })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in format HH:MM:SS',
  })
  startTime?: string;

  @ApiProperty({
    example: '11:00:00',
    description: 'Время окончания (HH:MM:SS)',
    required: false,
  })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in format HH:MM:SS',
  })
  endTime?: string;

  @ApiProperty({
    example: '2025-12-01',
    description: 'Дата начала периода (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    example: '2025-12-05',
    description: 'Дата окончания периода (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    type: [TaskSubtaskDto],
    description: 'Список подзадач',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskSubtaskDto)
  subtasks?: TaskSubtaskDto[];
}
