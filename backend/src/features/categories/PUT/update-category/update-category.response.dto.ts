import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../../entities/category.entity';

export class UpdateCategoryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Работа (обновлено)' })
  name: string;

  @ApiProperty({ example: '#33FF57' })
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
