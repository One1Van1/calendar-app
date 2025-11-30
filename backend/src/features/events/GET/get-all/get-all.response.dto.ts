import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../../../entities/event.entity';

export class GetAllEventsResponseDto {
  @ApiProperty({
    type: [Event],
    description: 'Список событий',
  })
  items: Event[];

  @ApiProperty({
    example: 100,
    description: 'Общее количество событий',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Текущая страница',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Количество элементов на странице',
  })
  limit: number;

  @ApiProperty({
    example: 10,
    description: 'Всего страниц',
  })
  totalPages: number;

  constructor(items: Event[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
