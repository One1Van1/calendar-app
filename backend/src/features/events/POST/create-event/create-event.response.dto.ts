import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../../../entities/event.entity';

export class CreateEventResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID созданного события',
  })
  id: number;

  @ApiProperty({
    example: 'Встреча с командой',
    description: 'Название события',
  })
  title: string;

  @ApiProperty({
    example: 'Обсуждение нового проекта',
    description: 'Описание события',
  })
  description?: string;

  @ApiProperty({
    example: '2025-12-01T10:00:00.000Z',
    description: 'Дата и время начала',
  })
  startDate: Date;

  @ApiProperty({
    example: '2025-12-01T11:00:00.000Z',
    description: 'Дата и время окончания',
  })
  endDate: Date;

  @ApiProperty({
    example: false,
    description: 'Событие на весь день',
  })
  allDay: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID категории',
  })
  categoryId?: number;

  @ApiProperty({
    example: '2025-11-30T19:42:40.000Z',
    description: 'Дата создания',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-11-30T19:42:40.000Z',
    description: 'Дата последнего обновления',
  })
  updatedAt: Date;

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.allDay = event.allDay;
    this.categoryId = event.categoryId;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
  }
}
