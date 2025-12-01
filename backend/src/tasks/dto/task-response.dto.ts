import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../entities/task.entity';
import { TaskSubtask } from '../../entities/task-subtask.entity';

export class TaskSubtaskResponseDto {
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

  constructor(subtask: TaskSubtask) {
    this.id = subtask.id;
    this.text = subtask.text;
    this.completed = subtask.completed;
    this.order = subtask.order;
    this.createdAt = subtask.createdAt;
    this.updatedAt = subtask.updatedAt;
  }
}

export class TaskResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Завершить проект' })
  name: string;

  @ApiProperty({ example: 'Закончить работу над Calendar App', required: false })
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

  @ApiProperty({ type: [TaskSubtaskResponseDto] })
  subtasks: TaskSubtaskResponseDto[];

  @ApiProperty({ example: 50, description: 'Процент выполнения (0-100)' })
  progress: number;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.date = task.date?.toISOString().split('T')[0];
    this.startTime = task.startTime;
    this.endTime = task.endTime;
    this.startDate = task.startDate?.toISOString().split('T')[0];
    this.endDate = task.endDate?.toISOString().split('T')[0];
    this.subtasks = task.subtasks?.map((st) => new TaskSubtaskResponseDto(st)) || [];
    this.progress = task.progress;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
