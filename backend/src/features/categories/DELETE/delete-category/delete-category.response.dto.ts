import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoryResponseDto {
  @ApiProperty({
    example: true,
    description: 'Успешность операции',
  })
  success: boolean;

  @ApiProperty({
    example: 'Category deleted successfully',
    description: 'Сообщение',
  })
  message: string;

  @ApiProperty({
    example: 1,
    description: 'ID удалённой категории',
  })
  deletedId: number;

  constructor(id: number) {
    this.success = true;
    this.message = 'Category deleted successfully';
    this.deletedId = id;
  }
}
