import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../../../entities/event.entity';

class EventItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Встреча с командой' })
  title: string;

  @ApiProperty({ example: 'Обсуждение проекта' })
  description?: string;

  @ApiProperty({ example: '2025-12-01T10:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2025-12-01T11:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: false })
  allDay: boolean;

  @ApiProperty({ example: 1 })
  categoryId?: number;

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.allDay = event.allDay;
    this.categoryId = event.categoryId;
  }
}

export class GetByRangeResponseDto {
  @ApiProperty({
    type: [EventItemDto],
    description: 'Список событий в диапазоне',
  })
  events: EventItemDto[];

  @ApiProperty({
    example: 15,
    description: 'Количество событий',
  })
  total: number;

  @ApiProperty({
    example: '2025-12-01T00:00:00.000Z',
    description: 'Начальная дата диапазона',
  })
  startDate: Date;

  @ApiProperty({
    example: '2025-12-31T23:59:59.999Z',
    description: 'Конечная дата диапазона',
  })
  endDate: Date;

  constructor(events: Event[], startDate: Date, endDate: Date) {
    this.events = events.map((event) => new EventItemDto(event));
    this.total = events.length;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
