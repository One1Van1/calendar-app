import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../../../entities/event.entity';

export class UpdateEventResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Встреча с командой (обновлено)' })
  title: string;

  @ApiProperty({ example: 'Новое описание' })
  description?: string;

  @ApiProperty({ example: '2025-12-01T11:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2025-12-01T12:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: true })
  allDay: boolean;

  @ApiProperty({ example: 2 })
  categoryId?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
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
