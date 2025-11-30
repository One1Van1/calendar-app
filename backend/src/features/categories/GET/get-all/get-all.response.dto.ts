import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../../entities/category.entity';

class CategoryItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Работа' })
  name: string;

  @ApiProperty({ example: '#FF5733' })
  color: string;

  @ApiProperty()
  createdAt: Date;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.color = category.color;
    this.createdAt = category.createdAt;
  }
}

export class GetAllCategoriesResponseDto {
  @ApiProperty({
    type: [CategoryItemDto],
    description: 'Список категорий',
  })
  data: CategoryItemDto[];

  @ApiProperty({
    example: 10,
    description: 'Общее количество категорий',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Текущая страница',
  })
  page: number;

  @ApiProperty({
    example: 50,
    description: 'Количество категорий на странице',
  })
  limit: number;

  @ApiProperty({
    example: 1,
    description: 'Всего страниц',
  })
  totalPages: number;

  constructor(categories: Category[], total: number, page: number, limit: number) {
    this.data = categories.map((category) => new CategoryItemDto(category));
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
