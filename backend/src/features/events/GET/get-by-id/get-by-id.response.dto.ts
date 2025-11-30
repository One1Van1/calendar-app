import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../../../entities/event.entity';

export class GetByIdEventResponseDto {
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
