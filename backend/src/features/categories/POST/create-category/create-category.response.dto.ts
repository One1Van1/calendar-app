import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../../entities/category.entity';

export class CreateCategoryResponseDto {
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
