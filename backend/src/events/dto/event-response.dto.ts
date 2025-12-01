import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../entities/event.entity';
import { Subtask } from '../../entities/subtask.entity';

export class SubtaskResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Подготовить презентацию' })
  text: string;

  @ApiProperty({ example: false })
  completed: boolean;

  @ApiProperty({ example: 0 })
  order: number;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  updatedAt: Date;

  constructor(subtask: Subtask) {
    this.id = subtask.id;
    this.text = subtask.text;
    this.completed = subtask.completed;
    this.order = subtask.order;
    this.createdAt = subtask.createdAt;
    this.updatedAt = subtask.updatedAt;
  }
}

export class EventResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Встреча с командой' })
  name: string;

  @ApiProperty({ example: 'Обсуждение нового проекта', required: false })
  description?: string;

  @ApiProperty({ example: '2025-12-01' })
  date: string;

  @ApiProperty({ example: '10:00:00', required: false })
  startTime?: string;

  @ApiProperty({ example: '11:00:00', required: false })
  endTime?: string;

  @ApiProperty({ example: '2025-12-01', required: false })
  startDate?: string;

  @ApiProperty({ example: '2025-12-05', required: false })
  endDate?: string;

  @ApiProperty({ type: [SubtaskResponseDto] })
  subtasks: SubtaskResponseDto[];

  @ApiProperty({ example: 50, description: 'Процент выполнения (0-100)' })
  progress: number;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  updatedAt: Date;

  constructor(event: Event) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.date = event.date?.toISOString().split('T')[0];
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.startDate = event.startDate?.toISOString().split('T')[0];
    this.endDate = event.endDate?.toISOString().split('T')[0];
    this.subtasks = event.subtasks?.map((st) => new SubtaskResponseDto(st)) || [];
    this.progress = event.progress;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
  }
}
